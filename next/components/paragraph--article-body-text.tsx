import { FormattedText } from "@/components/formatted-text";
import { ArticleBodyText as ArticleBodyTextType } from "@/lib/zod/paragraph";

export function ParagraphArticleBodyText({
  paragraph,
}: {
  paragraph: ArticleBodyTextType;
}) {
  return (
    <>
      {paragraph.field_formatted_text.processed && (
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className="text-left text-md mt-4"
        />
      )}
    </>
  );
}
