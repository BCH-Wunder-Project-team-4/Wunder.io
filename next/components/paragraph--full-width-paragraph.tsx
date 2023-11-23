import { FormattedText } from "@/components/formatted-text";
import { FullWidthParagraph as FullWidthParagraphType } from "@/lib/zod/paragraph";
import { MediaImage } from "@/components/media--image";
import clsx from "clsx";

export function FullWidthParagraph({ paragraph }: { paragraph: FullWidthParagraphType }) {
  console.log(paragraph);

  return (
    <div>

      {paragraph.field_image.map((image) => (
        <MediaImage
          media={image}
          alt="site-banner"
          priority
        />
      ))}
      {paragraph.field_formatted_text.map((text) => (
        <FormattedText
          html={text.processed}
          className={clsx(
            "mb-6 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-8 lg:text-xl mt-4",
          )}
        />
      ))}


    </div>
  )
}