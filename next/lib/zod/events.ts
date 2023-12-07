import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";

export const EventBaseSchema = z.object({
  type: z.literal("node--events"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_event_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_event_address: z.string().optional().nullable(),
  field_event_description: z.string().optional().nullable(),
  field_event_duration: z.string().optional().nullable(),
  field_event_geocode_latitude: z.number().optional().nullable(),
  field_event_geocode_longitude: z.number().optional().nullable(),
  field_event_location: z.string().optional().nullable(),
  field_event_date: z.string().optional().nullable(),
  field_event_speakers: z
    .array(
      z.object({
        type: z.literal("paragraph--event_speakers_information"),
        id: z.string(),
        field_event_speakers_description: z.string().optional().nullable(),
        field_event_speakers_image: ImageShape.nullable(),
        field_event_speakers_name: z.string().optional().nullable(),
      }),
    )
    .optional()
    .nullable(),
});

const EventSchema = EventBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  // body: z.object({
  //   processed: z.string(),
  // }),
});

export function validateAndCleanupEvent(event: DrupalNode): Event | null {
  try {
    return EventSchema.parse(event);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, event }, null, 2));
    return null;
  }
}

export type Event = z.infer<typeof EventSchema>;
