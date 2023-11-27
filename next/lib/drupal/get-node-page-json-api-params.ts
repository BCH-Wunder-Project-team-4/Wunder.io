import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { env } from "@/env";

export type ResourceType = "node--frontpage" | "node--page" | "node--article" | "node--job" | "node--case" | "node--employee" | "node--office" | "node--events";

export function getNodePageJsonApiParams(resourceType: ResourceType) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    env.DRUPAL_SITE_ID,
  );
  // The page content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      .addFields("node--page", [
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  // The frontpage content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--frontpage") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      // Only published frontpages:
      .addFilter("status", "1")
      .addFields("node--frontpage", [
        "title",
        "field_content_elements",
        "metatag",
      ]);
  }

  // The article content type has an image field, and author information:
  if (resourceType === "node--article") {
    apiParams.addInclude(["field_image", "uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }
  if (resourceType === "node--job") {
    apiParams.addInclude([
      "field_image",
      "uid",
      "field_country",
      "field_office",]);
/*     apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]); */
  }

  if (resourceType === "node--case") {
    apiParams
      .addInclude([
        "field_image",
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
        "field_industry",
        "field_solution",
        "field_technology",
      ])
      .addFields("node--case", [
        "title",
        "field_industry",
        "field_solution",
        "field_technology",
        "field_date",
        "field_image",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }
  if (resourceType === "node--employee") {
    apiParams.addInclude(["field_employee_image", "uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_name",
      "field_employee_image",
      "field_employee_email",
      "field_employee_phone",
      "field_employee_position",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }
  if (resourceType === "node--office") {
    apiParams.addInclude(["uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_name",
      "field_office_address_one",
      "field_office_address_two",
      "field_office_email",
      "field_office_country",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }
  if (resourceType === "node--events") {
    apiParams.addInclude(["uid", "field_event_image", "field_event_speakers_image"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_name",
      "field_event_image",
      "field_event_date",
      "field_event_location",
      "field_event_address",
      "field_event_description",
      "field_event_duration",
      "field_event_speakers",
      "field_event_speakers_info",
      "field_event_speakers_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
    ]);
  }

  return apiParams;
}
