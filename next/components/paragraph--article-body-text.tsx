import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ArticleBodyText as ArticleBodyTextType } from "@/lib/zod/paragraph";

export function ParagraphArticleBodyText({
  paragraph,
}: {
  paragraph: ArticleBodyTextType;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      {paragraph.field_formatted_text.processed && (
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "text-left text-md/xl dark:text-graysuit text-scapaflow sm:text-lg",
            paragraph.field_heading && "mt-4",
          )}
        />
      )}
    </>
  );
}
