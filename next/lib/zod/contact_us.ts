import {
    BannerSchema,OfficesSchema,EmployeesSchema,ImageSchema,ContactBodySchema,FormattedTextSchema
  } from "@/lib/zod/paragraph";
  
  import { DrupalNode } from "next-drupal";
  import { MetatagsSchema } from "@/lib/zod/metatag";
  import { z } from "zod";
  
  const ContactUsElementsSchema = z.discriminatedUnion("type", [
    BannerSchema,
    OfficesSchema,EmployeesSchema,ImageSchema,ContactBodySchema,FormattedTextSchema
  ]);
  
  export const ContactUsSchema = z.object({
    type: z.literal("node--contact_us"),
    id: z.string(),
    title: z.string(),
    field_contact_content_elements: z.array(ContactUsElementsSchema),
    field_contact_invoicing:z.array(FormattedTextSchema),
    metatag: MetatagsSchema.optional(),
  });
  
  export function validateAndCleanupContactUs(
    contact_us: DrupalNode,
  ): ContactUs | null {
    try {
      // Validate the top level fields first.
      const topLevelContactUsData = ContactUsSchema.omit({
        field_contact_content_elements: true,
      }).parse(contact_us);
  
      // Validate the field_content_elements separately, one by one.
      // This way, if one of them is invalid, we can still return the rest of the page contents.
      const validatedParagraphs = contact_us.field_contact_content_elements
        .map((paragraph: any) => {
          const result = ContactUsElementsSchema.safeParse(paragraph);
  
          switch (result.success) {
            case true:
              return result.data;
            case false:
              console.log(
                `Error validating contact_us paragraph ${paragraph.type}: `,
                JSON.stringify(result.error, null, 2),
              );
              return null;
          }
        })
        .filter(Boolean);
  
      return {
        ...topLevelContactUsData,
        field_contact_content_elements: validatedParagraphs,
      };
    } catch (error) {
      const { name = "ZodError", issues = [] } = error;
      console.log(JSON.stringify({ name, issues, contact_us }, null, 2));
      return null;
    }
  }
  
  export type ContactUs = z.infer<typeof ContactUsSchema>;
  