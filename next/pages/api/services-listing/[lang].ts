import { NextApiRequest, NextApiResponse } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "@/lib/drupal/drupal-client";
import { validateAndCleanupServiceTeaser } from "@/lib/zod/service-teaser";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const serviceTeasers = await drupal.getResourceCollection<DrupalNode[]>(
      "node--service",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--service]": "title,path,uid,created,field_excerpt",
        },
        locale: languagePrefix,
        defaultLocale: siteConfig.defaultLocale,
      },
    );
console.log(serviceTeasers);
    const validatedServiceTeasers = serviceTeasers
      .map((serviceNode) => validateAndCleanupServiceTeaser(serviceNode))
      // If any service teaser is invalid, it will be replaced by null in the array, so we need to filter it out:
      .filter((teaser) => {
        return teaser !== null;
      });

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(validatedServiceTeasers);
  }

  res.end();
}
