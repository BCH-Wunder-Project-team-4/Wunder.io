import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { JobBaseSchema } from "@/lib/zod/job";

export const JobTeaserSchema = JobBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupJobTeaser(
  jobTeaser: DrupalNode,
): JobTeaser | null {
  try {
    return JobTeaserSchema.parse(jobTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, jobTeaser }, null, 2));
    return null;
  }
}

export type JobTeaser = z.infer<typeof JobTeaserSchema>;
