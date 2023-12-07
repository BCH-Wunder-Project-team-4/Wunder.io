import { DrupalNode } from "next-drupal";
import { ExpertTalkBaseSchema } from "@/lib/zod/expertTalk";
import { z } from "zod";

export const ExpertTalkTeaserSchema = ExpertTalkBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupExpertTalkTeaser(
  expertTalkTeaser: DrupalNode,
): ExpertTalkTeaser | null {
  try {
    return ExpertTalkTeaserSchema.parse(expertTalkTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, expertTalkTeaser }, null, 2));
    return null;
  }
}

export type ExpertTalkTeaser = z.infer<typeof ExpertTalkTeaserSchema>;
