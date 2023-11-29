import { MediaImage } from "@/components/media--image";
import { SimpleQuote } from "@/lib/zod/paragraph";

export function ParagraphSimpleQuote({
  paragraph,
}: {
  paragraph: SimpleQuote;
}) {
  return (
    <div>
      <p className="text-success">{paragraph.field_quote}</p>
      <p className="text-success">{paragraph.field_quote_author}</p>
      {paragraph.field_image && (
        <MediaImage media={paragraph.field_image} alt="author image" priority />
      )}
    </div>
  );
}
