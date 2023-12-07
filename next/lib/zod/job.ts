import { DrupalNode } from "next-drupal";
import { ImageShape } from "@/lib/zod/paragraph";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

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
});

const JobSchema = JobBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
});

export function validateAndCleanupJob(job: DrupalNode): Job | null {
  try {
    return JobSchema.parse(job);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, job }, null, 2));
    return null;
  }
}

export type Job = z.infer<typeof JobSchema>;
