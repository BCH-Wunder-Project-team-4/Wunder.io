import { ArticleFormattedText } from "@/components/article-formatted-text";
import { ArticleBodyText as ArticleBodyTextType } from "@/lib/zod/paragraph";

export function ParagraphArticleBodyText({
  paragraph,
}: {
  paragraph: ArticleBodyTextType;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <h2 className="text-left text-primary-600 dark:text-fog text-heading-md font-bold md:text-heading-lg mb-4">
          {paragraph.field_heading}
        </h2>
      )}
      {paragraph.field_formatted_text.processed && (
        <ArticleFormattedText
          html={paragraph.field_formatted_text.processed}
          className="text-left text-md mt-4"
        />
      )}
    </>
  );
}
