import { FormattedText } from "@/components/formatted-text";
import { FullWidthParagraph as FullWidthParagraphType } from "@/lib/zod/paragraph";
import { MediaImage } from "@/components/media--image";
import { MediaVideo } from "./media--video";
import clsx from "clsx";
import css from "./full-width-paragraph.module.css";

export function FullWidthParagraph({ paragraph }: { paragraph: FullWidthParagraphType }) {

  return (
    <div className={clsx(css.relative)}>
      <div className={clsx(css.parent)}>
        <MediaImage
          className={clsx(css.firstImage)}
          media={paragraph.field_images[0]}
          alt="site-banner"
          priority
        />
        <MediaImage
          className={clsx(css.secondImage)}
          media={paragraph.field_images[1]}
          alt="site-banner"
          priority
        />
        <MediaImage
          className={clsx(css.thirdImage)}
          media={paragraph.field_images[2]}
          alt="site-banner"
          priority
        />
        <MediaImage
          className={clsx(css.forthImage)}
          media={paragraph.field_images[3]}
          alt="site-banner"
          priority
        />


        <div className={clsx(css.firstText, "mt-10")}>
          <FormattedText
            html={paragraph.field_texts[0].processed}
            className={clsx(
              "max-w-2xl text-primary-600 sm:text-md md:text-md lg:mb-8 xl:text-lg 2xl:text-xl text-left md:text-right "
            )}
          />
        </div>
        <div className={clsx(css.secondText)}>
          <FormattedText
            html={paragraph.field_texts[1].processed}
            className={clsx(
              "max-w-2xl text-left  text-primary-600  md:text-md lg:mb-8 xl:text-lg 2xl:text-xl mt-4 ",
            )}
          />
        </div>
        <div className={clsx(css.thirdText, "flex justify-end")}>
          <FormattedText
            html={paragraph.field_texts[2].processed}
            className={clsx(
              "max-w-2xl text-left md:text-right  text-primary-600 md:text-md lg:mb-8 xl:text-lg 2xl:text-xl",
            )}
          />
        </div>



      </div>
    </div >
  )
}