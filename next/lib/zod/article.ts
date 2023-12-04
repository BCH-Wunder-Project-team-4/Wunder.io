import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";
import {
  AccordionSchema,
  BannerSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

const ArticleElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  BannerSchema,
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
