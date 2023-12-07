import { DrupalNode } from "next-drupal";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

export const OfficeBaseSchema = z.object({
  type: z.literal("node--office"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_office_email: z.string().optional().nullable(),
  field_office_address_one: z.string().optional().nullable(),
  field_office_address_two: z.string().optional().nullable(),
  field_office_country: z.string().optional().nullable(),
  field_office_geocode_latitude: z.number().optional().nullable(),
  field_office_geocode_longitude: z.number().optional().nullable(),

});

const OfficeSchema = OfficeBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
});

export function validateAndCleanupOffice(office: DrupalNode): Office | null {
  try {
    return OfficeSchema.parse(office);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, office }, null, 2));
    return null;
  }
}

export type Office = z.infer<typeof OfficeSchema>;