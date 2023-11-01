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

const JobElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
]);

export const JobSchema = z.object({
  type: z.literal("node--job"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(JobElementsSchema),
  metatag: MetatagsSchema.optional(),
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
              `Error validating job paragraph ${paragraph.type}: `,
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
