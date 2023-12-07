import { DrupalNode } from "next-drupal";
import { ServiceSchema } from "@/lib/zod/service";
import { z } from "zod";

export const ServiceTeaserSchema = ServiceSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupServiceTeaser(
  serviceTeaser: DrupalNode,
): ServiceTeaser | null {
  try {
    return ServiceTeaserSchema.parse(serviceTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, serviceTeaser }, null, 2));
    return null;
  }
}

export type ServiceTeaser = z.infer<typeof ServiceTeaserSchema>;
