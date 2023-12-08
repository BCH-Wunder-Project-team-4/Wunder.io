import { NextApiRequest, NextApiResponse } from "next";

import { DrupalNode } from "next-drupal";
import { drupal } from "@/lib/drupal/drupal-client";
import siteConfig from "@/site.config";
import { validateAndCleanupEventTeaser } from "@/lib/zod/events-teaser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const limit = Number(req.query.limit) || 10;
    const eventTeasers = await drupal.getResourceCollection<DrupalNode[]>(
      "node--events",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--events]": "title,path,field_event_image,uid,field_event_date,field_event_location,created",
          include: "field_event_image,uid",
          sort: "-sticky,-created",
          "page[limit]": limit,
        },
        locale: languagePrefix,
        defaultLocale: siteConfig.defaultLocale,
      },
    );

    const validatedEventTeasers = eventTeasers
      .map((eventNode) => validateAndCleanupEventTeaser(eventNode))
      // If any event teaser is invalid, it will be replaced by null in the array, so we need to filter it out:
      .filter((teaser) => {
        return teaser !== null;
      });

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(validatedEventTeasers);
  }

  res.end();
}
