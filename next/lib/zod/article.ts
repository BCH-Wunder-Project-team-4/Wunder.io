import {
  AccordionSchema,
  ArticleBodyTextSchema,
  BannerSchema,
  FileAttachmentsSchema,
  ImageSchema,
  InfosectionBSchema,
  InfosectionSchema,
  LinksSchema,
  ListingArticlesSchema,
  SimpleQuoteSchema,
  SubheadingSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";
import { DrupalNode } from "next-drupal";
import { z } from "zod";

const ArticleElementsSchema = z.discriminatedUnion("type", [
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  BannerSchema,
  SimpleQuoteSchema,
  SubheadingSchema,
  ArticleBodyTextSchema,
  InfosectionSchema,
  InfosectionBSchema,
]);

export const ArticleSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  title: z.string(),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_content_elements: z.array(ArticleElementsSchema).optional(),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupArticle(article: DrupalNode): Article | null {
  try {
    const topLevelArticleData = ArticleSchema.omit({
      field_content_elements: true,
    }).parse(article);

    const validatedParagraphs = article.field_content_elements
      .map((paragraph: any) => {
        const result = ArticleElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating article paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelArticleData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, article }, null, 2));
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;
