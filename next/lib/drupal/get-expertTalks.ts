import { DrupalNode, JsonApiResponse, deserialize } from "next-drupal";

import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import siteConfig from "@/site.config";

type GetExpertTalksArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
};

export const getExpertTalks = async (
  { limit = 6, offset = 0, locale = siteConfig.defaultLocale }: GetExpertTalksArgs,
  apiParams: DrupalJsonApiParams,
): Promise<{
  totalPages: number;
  nodes: DrupalNode[];
}> => {
  apiParams.addPageLimit(limit);

  let nodes: DrupalNode[] = [];
  let totalPages = 1;
  try {
    const result = await drupal.getResourceCollection<JsonApiResponse>(
      "node--expert_talks",
      {
        deserialize: false,
        params: {
          ...apiParams.getQueryObject(),
          "filter[langcode]": locale,
          "filter[status]": "1",
          page: {
            limit,
            offset,
          },
          sort: "-sticky,-created",
        },
        locale: locale,
        defaultLocale: siteConfig.defaultLocale,
      },
    );
    if (result.data) {
      nodes = deserialize(result) as DrupalNode[];
      totalPages = Math.ceil(result.meta.count / limit);
    }
  } catch (error) {
    console.error(error);
  }

  return {
    totalPages,
    nodes,
  };
};

export const getLatestExpertTalksItems = async (
  args: GetExpertTalksArgs,
): Promise<{
  totalPages: number;
  expertTalks: DrupalNode[];
}> => {
  const apiParams = getNodePageJsonApiParams("node--expert_talks");
  const { totalPages, nodes } = await getExpertTalks(args, apiParams);

  return {
    totalPages,
    expertTalks: nodes,
  };
};
