import { NextApiRequest, NextApiResponse } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "@/lib/drupal/drupal-client";
import { validateAndCleanupJobTeaser } from "@/lib/zod/job-teaser";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const limit = Number(req.query.limit) || 10;
    const jobTeasers = await drupal.getResourceCollection<DrupalNode[]>(
      "node--job",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--job]": "title,path,field_image,uid,created",
          include: "field_image,uid",
          sort: "-sticky,-created",
          "page[limit]": limit,
        },
        locale: languagePrefix,
        defaultLocale: siteConfig.defaultLocale,
      },
    );

    const validatedJobTeasers = jobTeasers
      .map((jobNode) => validateAndCleanupJobTeaser(jobNode))
      // If any job teaser is invalid, it will be replaced by null in the array, so we need to filter it out:
      .filter((teaser) => {
        return teaser !== null;
      });

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(validatedJobTeasers);
  }

  res.end();
}
