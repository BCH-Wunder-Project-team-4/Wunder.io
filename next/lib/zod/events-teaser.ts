import { DrupalNode } from "next-drupal";
import { EventBaseSchema } from "@/lib/zod/events";
import { z } from "zod";

export const EventTeaserSchema = EventBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupEventTeaser(
  eventTeaser: DrupalNode,
): EventTeaser | null {
  try {
    return EventTeaserSchema.parse(eventTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, eventTeaser }, null, 2));
    return null;
  }
}

export type EventTeaser = z.infer<typeof EventTeaserSchema>;
