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
} from "@/lib/zod/paragraph";

const Job_listingElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
]);

export const Job_listingSchema = z.object({
  type: z.literal("node--job_listing"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(Job_listingElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupJob_listing(job_listing: DrupalNode): Job_listing | null {
  try {
    // Validate the top level fields first.
    const topLevelJob_listingData = Job_listingSchema.omit({
      field_content_elements: true,
    }).parse(job_listing);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the job_listing contents.
    const validatedParagraphs = job_listing.field_content_elements
      .map((paragraph: any) => {
        const result = Job_listingElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating job_listing paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelJob_listingData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, job_listing }, null, 2));
    return null;
  }
}

export type Job_listing = z.infer<typeof Job_listingSchema>;
