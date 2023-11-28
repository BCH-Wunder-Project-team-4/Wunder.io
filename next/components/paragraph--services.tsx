import { HeadingParagraph } from "@/components/heading--paragraph";
import { Services } from "@/lib/zod/paragraph";

export function ParagraphServices({
  paragraph,
}: {
  paragraph: Services;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
    </>
  );
}
