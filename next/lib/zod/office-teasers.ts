import { DrupalNode } from "next-drupal";
import { OfficeBaseSchema } from "@/lib/zod/office";
import { z } from "zod";

export const OfficeTeaserSchema = OfficeBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }).nullable().optional(),
});

export function validateAndCleanupOfficeTeaser(
  officeTeaser: DrupalNode,
): OfficeTeaser | null {
  try {
    return OfficeTeaserSchema.parse(officeTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, officeTeaser }, null, 2));
    return null;
  }
}

export type OfficeTeaser = z.infer<typeof OfficeTeaserSchema>;
