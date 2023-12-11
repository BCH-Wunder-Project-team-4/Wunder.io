import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Infosection as InfosectionType } from "@/lib/zod/paragraph";

export function ParagraphInfosection({ paragraph }: { paragraph: InfosectionType }) {
  return (
    <section id="hero" className="border-b border-primary-600 dark:border-fog pb-5">
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12  justify-center items-center">
        <div className="mr-auto place-self-center px-8 py-8 lg:col-span-6  lg:py-16">
          {paragraph.field_heading && (
            <h3 className="leading-none mb-4 max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog">
              {paragraph.field_heading}
            </h3>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-0 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-0 lg:text-lg",
              paragraph.field_heading && "mt-4",
            )}
          />
        </div>
        <div className="lg:col-span-6 lg:mt-0 lg:flex-col">
        <div className="relative mx-auto border-steelgray dark:border-scapaflow bg-steelgray border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
          <div className="h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
          <MediaImage
            media={paragraph.field_image}
            alt="site-banner"
            priority
            className="dark:hidden h-[156px] md:h-[278px] w-full"
          />
          <MediaImage
            media={paragraph.field_dark_image}
            alt="site-banner"
            priority
            className="hidden dark:block h-[156px] md:h-[278px] w-full"
          />
          </div>
        </div>
            <div className="relative mx-auto bg-scapaflow dark:bg-stone rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-steelgray dark:bg-scapaflow"></div>
            </div>
        </div>
      </div>
    </section>
  );
}