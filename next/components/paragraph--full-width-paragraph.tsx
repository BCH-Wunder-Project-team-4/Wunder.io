import { FormattedText } from "@/components/formatted-text";
import { FullWidthParagraph as FullWidthParagraphType } from "@/lib/zod/paragraph";
import { MediaImage } from "@/components/media--image";
import clsx from "clsx";

export function FullWidthParagraph({ paragraph }: { paragraph: FullWidthParagraphType }) {


  return (
    <div className="relative">
      <div className="my-custom-full-width-component parent">
        <MediaImage
          className="firstImage"
          media={paragraph.field_image[0]}
          alt="site-banner"
          priority
        />
        <MediaImage
          className="secondImage"
          media={paragraph.field_image[1]}
          alt="site-banner"
          priority
        />
        <MediaImage
          className="thirdImage"
          media={paragraph.field_image[2]}
          alt="site-banner"
          priority
        />
        <MediaImage
          className="forthImage"
          media={paragraph.field_image[3]}
          alt="site-banner"
          priority
        />


        <div className="firstText mt-10">
          <FormattedText
            html={paragraph.field_formatted_text[0].processed}
            className={clsx(
              "max-w-2xl text-primary-600 sm:text-md md:text-md lg:mb-8 xl:text-lg 2xl:text-xl text-left md:text-right "
            )}
          />
        </div>
        <div className="secondText">
          <FormattedText
            html={paragraph.field_formatted_text[1].processed}
            className={clsx(
              " max-w-2xl text-left  text-primary-600 sm:text-md md:text-md lg:mb-8 xl:text-lg 2xl:text-xl mt-4 ",
            )}
          />
        </div>
        <div className="thirdText flex justify-end">
          <FormattedText
            html={paragraph.field_formatted_text[2].processed}
            className={clsx(
              " max-w-2xl text-left md:text-right  text-primary-600 md:text-md lg:mb-8 xl:text-lg 2xl:text-xl",
            )}
          />
        </div>



      </div>
    </div >
  )
}