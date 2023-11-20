import { DrupalNode } from "next-drupal";
import { z } from "zod";
import { EmployeeBaseSchema } from "@/lib/zod/employee";



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
