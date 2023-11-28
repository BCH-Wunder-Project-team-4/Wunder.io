import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  AccordionSchema,
  BannerSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

const ServiceElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  BannerSchema,
]);

export const ServiceSchema = z.object({
  type: z.literal("node--service"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(ServiceElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupService(service: DrupalNode): Service | null {
  try {
    // Validate the top level fields first.
    const topLevelServiceData = ServiceSchema.omit({
      field_content_elements: true,
    }).parse(service);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the service contents.
    const validatedParagraphs = service.field_content_elements
      .map((paragraph: any) => {
        const result = ServiceElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating service paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelServiceData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, service }, null, 2));
    return null;
  }
}

export type Service = z.infer<typeof ServiceSchema>;
