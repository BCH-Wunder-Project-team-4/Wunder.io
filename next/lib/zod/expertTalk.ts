import { DrupalNode } from "next-drupal";
import { ImageShape } from "@/lib/zod/paragraph";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

export const ExpertTalkBaseSchema = z.object({
  type: z.literal("node--expert_talks"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_image: ImageShape.nullable(),
  field_experts_photo: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_name: z.string().nullable().optional(),
  field_expert_job_title: z.string().optional().nullable(),
});

const ExpertTalkSchema = ExpertTalkBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
});

export function validateAndCleanupExpertTalk(expertTalk: DrupalNode): ExpertTalk | null {
  try {

    return ExpertTalkSchema.parse(expertTalk);

  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, expertTalk }, null, 2));
    return null;
  }
}

export type ExpertTalk = z.infer<typeof ExpertTalkSchema>;
