import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  AccordionSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  VideoSchema,
  BannerSchema,
  ServicesSchema
} from "@/lib/zod/paragraph";

const OfferingElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  BannerSchema,
  ServicesSchema
]);

export const OfferingSchema = z.object({
  type: z.literal("node--offering"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(OfferingElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupOffering(
  offering: DrupalNode,
): Offering | null {
  try {
    // Validate the top level fields first.
    const topLevelOfferingData = OfferingSchema.omit({
      field_content_elements: true,
    }).parse(offering);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = offering.field_content_elements
      .map((paragraph: any) => {
        const result = OfferingElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating offering paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelOfferingData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, offering }, null, 2));
    return null;
  }
}

export type Offering = z.infer<typeof OfferingSchema>;
