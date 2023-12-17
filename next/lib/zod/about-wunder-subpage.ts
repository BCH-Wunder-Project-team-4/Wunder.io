import {
  AccordionSchema,
  AnchorSchema,
  BannerSchema,
  FormattedTextSchema,
  ImageSchema,
  LinksSchema,
  LogoWallSchema,
  ScrollingNumbersSchema,
  SectionbgSchema,
  SimpleQuoteSchema,
  SubheadingSchema,
  TrilogySnapshotSchema,
  VideoSchema,
  ContactDetailsSchema,
} from "@/lib/zod/paragraph";

import { DrupalNode } from "next-drupal";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { z } from "zod";

const AboutWunderSubpageElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  BannerSchema,
  ScrollingNumbersSchema,
  SubheadingSchema,
  SectionbgSchema,
  SimpleQuoteSchema,
  LogoWallSchema,
  TrilogySnapshotSchema,
  AnchorSchema,
  ContactDetailsSchema,
]);

export const AboutWunderSubpageSchema = z.object({
  type: z.literal("node--about_wunder_subpage"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(AboutWunderSubpageElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupAboutWunderSubpage(
  about_wunder_subpage: DrupalNode,
): AboutWunderSubpage | null {
  try {
    // Validate the top level fields first.
    const topLevelAboutWunderSubpageData = AboutWunderSubpageSchema.omit({
      field_content_elements: true,
    }).parse(about_wunder_subpage);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.

    const validatedParagraphs = about_wunder_subpage.field_content_elements
      .map((paragraph: any) => {
        const result = AboutWunderSubpageElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating page paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelAboutWunderSubpageData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, about_wunder_subpage }, null, 2));
    return null;
  }
}

export type AboutWunderSubpage = z.infer<typeof AboutWunderSubpageSchema>;
