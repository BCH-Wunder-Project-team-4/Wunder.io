import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";


export const EmployeeBaseSchema = z.object({
  type: z.literal("node--employee"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_employee_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_employee_email: z.string().optional().nullable(),
  field_employee_phone: z.string().optional().nullable(),
  field_employee_name: z.string().optional().nullable(),
  
});

const EmployeeSchema = EmployeeBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
});

export function validateAndCleanupEmployee(employee: DrupalNode): Employee | null {
  try {
    return EmployeeSchema.parse(employee);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, employee }, null, 2));
    return null;
  }
}

export type Employee = z.infer<typeof EmployeeSchema>;