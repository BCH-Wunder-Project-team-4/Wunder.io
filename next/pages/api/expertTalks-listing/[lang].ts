import { NextApiRequest, NextApiResponse } from "next";

import { DrupalNode } from "next-drupal";
import { drupal } from "@/lib/drupal/drupal-client";
import siteConfig from "@/site.config";
import { validateAndCleanupExpertTalkTeaser } from "@/lib/zod/expertTalk-teaser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const limit = Number(req.query.limit) || 10;
    const expertTalkTeasers = await drupal.getResourceCollection<DrupalNode[]>(
      "node--expert_talks",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--expert_talks]": "title,path,field_image,uid,created,field_experts_photo,field_name,field_excerpt,field_expert_job_title",
          include: "field_image,uid,field_experts_photo",
          sort: "-sticky,-created",
          "page[limit]": limit,
        },
        locale: languagePrefix,
        defaultLocale: siteConfig.defaultLocale,
      },
    );

    const validatedExpertTalkTeasers = expertTalkTeasers
      .map((expertTalkNode) => validateAndCleanupExpertTalkTeaser(expertTalkNode))
      // If any ExpertTalk teaser is invalid, it will be replaced by null in the array, so we need to filter it out:
      .filter((teaser) => {
        return teaser !== null;
      });

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(validatedExpertTalkTeasers);
  }

  res.end();
}
