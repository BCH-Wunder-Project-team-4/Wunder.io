import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";
import { any } from "cypress/types/bluebird";

export const ClientBaseSchema = z.object({
  type: z.literal("node--client"),
  id: z.string(),
  uid: z.object({
    id: z.any(),
    display_name: z.any(),
  }),
  title: z.string(),
  field_logo: ImageShape.nullable(),
  field_link: z.any()
});

const ClientSchema = ClientBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupClient(client: DrupalNode): Client | null {
  try {
    return ClientSchema.parse(client);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, client }, null, 2));
    return null;
  }
}

export type Client = z.infer<typeof ClientSchema>;
