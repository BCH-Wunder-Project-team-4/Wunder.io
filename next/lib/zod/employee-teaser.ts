import { DrupalNode } from "next-drupal";
import { EmployeeBaseSchema } from "@/lib/zod/employee";
import { z } from "zod";

export const EmployeeTeaserSchema = EmployeeBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupEmployeeTeaser(
  employeeTeaser: DrupalNode,
): EmployeeTeaser | null {
  try {
    return EmployeeTeaserSchema.parse(employeeTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, employeeTeaser }, null, 2));
    return null;
  }
}

export type EmployeeTeaser = z.infer<typeof EmployeeTeaserSchema>;
