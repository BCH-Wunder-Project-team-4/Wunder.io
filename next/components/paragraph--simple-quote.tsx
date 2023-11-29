import { MediaImage } from "@/components/media--image";
import { SimpleQuote } from "@/lib/zod/paragraph";

export function ParagraphSimpleQuote({
  paragraph,
}: {
  paragraph: SimpleQuote;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-6">
      <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6">
        <p className="text-lg mb-4 italic text-center">
          {paragraph.field_quote}
        </p>
        <p className="uppercase text-hugs dark:text-bittersweet">
          {paragraph.field_quote_author}
        </p>
      </div>
      {paragraph.field_image && (
        <MediaImage
          className="rounded-full w-36 h-36 object-cover mx-auto md:mx-0"
          media={paragraph.field_image}
          alt="author image"
          priority
        />
      )}
    </div>
  );
}
