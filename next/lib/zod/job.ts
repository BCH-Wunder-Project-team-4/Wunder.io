import {
  AccordionSchema,
  BannerSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  SimpleQuoteSchema,
  SubheadingSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

import { DrupalNode } from "next-drupal";
import { ImageShape } from "@/lib/zod/paragraph";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

const JobElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  BannerSchema,
  SimpleQuoteSchema,
  SubheadingSchema,
]);

export const CountrySchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string()
});
export const OfficeSchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string()
});

export const JobBaseSchema = z.object({
  type: z.literal("node--job"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_country: z.array(CountrySchema).optional().nullable(),
  field_office: z.array(OfficeSchema).optional().nullable(),
  field_content_elements: z.array(JobElementsSchema).optional(),
});

const JobSchema = JobBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }).optional().nullable(),
});

export function validateAndCleanupJob(job: DrupalNode): Job | null {
  try {
    // Validate the top level fields first.
    const topLevelJobData = JobSchema.omit({
      field_content_elements: true,
    }).parse(job);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the job contents.
    const validatedParagraphs = job.field_content_elements
      .map((paragraph: any) => {
        const result = JobElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating Job paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelJobData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, job }, null, 2));
    return null;
  }
}

export type Job = z.infer<typeof JobSchema>;
