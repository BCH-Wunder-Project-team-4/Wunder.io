import { NextApiRequest, NextApiResponse } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "@/lib/drupal/drupal-client";
import { validateAndCleanupClient } from "@/lib/zod/client";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const clients = await drupal.getResourceCollection<DrupalNode[]>(
      "node--client",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--client]": "title,path,uid,field_logo,field_link",
          include: "field_logo,uid",
        },
        locale: languagePrefix,
        defaultLocale: siteConfig.defaultLocale,
      },
    );
    const validatedClients = clients
      .map((clientNode) => validateAndCleanupClient(clientNode))
      // If any client teaser is invalid, it will be replaced by null in the array, so we need to filter it out:
      .filter((teaser) => {
        return teaser !== null;
      });

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(validatedClients);
  }

  res.end();
}
