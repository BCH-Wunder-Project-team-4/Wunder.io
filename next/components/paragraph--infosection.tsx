import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Infosection as InfosectionType } from "@/lib/zod/paragraph";

export function ParagraphInfosection({ paragraph }: { paragraph: InfosectionType }) {
  return (
    <section id="hero" className="">
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12  justify-center items-center">
        <div className="mr-auto place-self-center px-8 py-8 lg:col-span-6  lg:py-16">
          {paragraph.field_heading && (
            <h3 className="leading-none mb-4 max-w-2xl text-left text-heading-sm tracking-tight text-primary-600 dark:text-primary-200">
              {paragraph.field_heading}
            </h3>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-6 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-8 lg:text-sm",
              paragraph.field_heading && "mt-4",
            )}
          />
        </div>
        <div className="hidden lg:col-span-6 lg:mt-0 lg:flex">
          <MediaImage
            media={paragraph.field_image}
            alt="site-banner"
            priority
          />
        </div>
      </div>
    </section>
  );
}
