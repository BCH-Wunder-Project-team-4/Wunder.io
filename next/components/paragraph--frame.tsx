import clsx from "clsx";
import { Frame as FrameType } from "@/lib/zod/paragraph";
import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";

export function ParagraphFrame({ paragraph }: { paragraph: FrameType }) {
  const isLaptop = paragraph.field_frame === "Laptop";
  const isMobile = paragraph.field_frame === "Mobile";
  const isTablet = paragraph.field_frame === "Tablet";
  const position = paragraph.field_image_position === "Right"

  if(position) {
  return (
    <section
      id="hero"
      className="border-b border-primary-600 dark:border-fog py-5"
    >
      <div className="lg:grid lg:grid-cols-3 lg:gap-8 md:flex-col">
        <div className="lg:col-span-1 flex flex-col justify-center p-4">
          {paragraph.field_heading && (
            <h3 className="leading-none mb-4 text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog">
              {paragraph.field_heading}
            </h3>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-0 max-w-2xl text-left text-primary-600 md:mb-4",
              paragraph.field_heading && "mt-4",
            )}
          />
        </div>
        <div className="lg:col-span-2">
          {isLaptop ? (
            // laptop option:
            <div className="flex-none">
              <div className="relative mx-auto border-steelgray dark:border-scapaflow bg-steelgray border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                <div className="h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                  <MediaImage
                    media={paragraph.field_image}
                    alt="site-banner"
                    priority
                    className="dark:hidden h-[156px] md:h-[278px] "
                  />
                  <MediaImage
                    media={paragraph.field_dark_image}
                    alt="site-banner"
                    priority
                    className="hidden dark:block h-[156px] md:h-[278px] "
                  />
                </div>
              </div>
              <div className="relative mx-auto bg-scapaflow dark:bg-stone rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-steelgray dark:bg-scapaflow"></div>
              </div>
            </div>
          ) : isMobile ? (
            // mobile option:
            <div className="relative mx-auto border-scapaflow dark:border-scapaflow bg-scapaflow border-[14px] rounded-[2.5rem] h-[450px] w-[254.17px]">
            <div className="h-[24px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[54px] rounded-s-lg"></div>
            <div className="h-[34.5px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[93px] rounded-s-lg"></div>
            <div className="h-[34.5px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[133.5px] rounded-s-lg"></div>
            <div className="h-[48px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -end-[17px] top-[106.5px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden bg-white dark:bg-scapaflow h-full">
              <MediaImage
                media={paragraph.field_image}
                alt="site-banner"
                priority
                className="dark:hidden h-full"
              />
              <MediaImage
                media={paragraph.field_dark_image}
                alt="site-banner"
                priority
                className="hidden dark:block h-full"
              />
            </div>
          </div>
          ) : isTablet ? (
            // tablet option:
            <div className="relative mx-auto border-scapaflow dark:border-scapaflow bg-scapaflow border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px]">
              <div className="h-[32px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden h-[426px] bg-white dark:bg-scapaflow">
                <MediaImage
                  media={paragraph.field_image}
                  alt="site-banner"
                  priority
                  className="dark:hidden h-full w-full"
                />
                <MediaImage
                  media={paragraph.field_dark_image}
                  alt="site-banner"
                  priority
                  className="hidden dark:block h-full w-full"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>

  );
} else {
  return (
    <section
    id="hero"
    className="border-b border-primary-600 dark:border-fog py-5"
  >
    <div className="lg:grid lg:grid-cols-3 lg:gap-8 md:flex-col">
      <div className="lg:col-span-2">
        {isLaptop ? (
          // laptop option:
          <div className="flex-none">
            <div className="relative mx-auto border-steelgray dark:border-scapaflow bg-steelgray border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
              <div className="h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                <MediaImage
                  media={paragraph.field_image}
                  alt="site-banner"
                  priority
                  className="dark:hidden h-[156px] md:h-[278px] "
                />
                <MediaImage
                  media={paragraph.field_dark_image}
                  alt="site-banner"
                  priority
                  className="hidden dark:block h-[156px] md:h-[278px] "
                />
              </div>
            </div>
            <div className="relative mx-auto bg-scapaflow dark:bg-stone rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-steelgray dark:bg-scapaflow"></div>
            </div>
          </div>
        ) : isMobile ? (
          // mobile option:
          <div className="relative mx-auto border-scapaflow dark:border-scapaflow bg-scapaflow border-[14px] rounded-[2.5rem] h-[450px] w-[254.17px]">
            <div className="h-[24px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[54px] rounded-s-lg"></div>
            <div className="h-[34.5px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[93px] rounded-s-lg"></div>
            <div className="h-[34.5px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[133.5px] rounded-s-lg"></div>
            <div className="h-[48px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -end-[17px] top-[106.5px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden bg-white dark:bg-scapaflow h-full">
              <MediaImage
                media={paragraph.field_image}
                alt="site-banner"
                priority
                className="dark:hidden h-full"
              />
              <MediaImage
                media={paragraph.field_dark_image}
                alt="site-banner"
                priority
                className="hidden dark:block h-full"
              />
            </div>
          </div>
        ) : isTablet ? (
          // tablet option:
          <div className="relative mx-auto border-scapaflow dark:border-scapaflow bg-scapaflow border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px]">
            <div className="h-[32px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-scapaflow dark:bg-scapaflow absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden h-[426px] bg-white dark:bg-scapaflow">
              <MediaImage
                media={paragraph.field_image}
                alt="site-banner"
                priority
                className="dark:hidden h-full w-full"
              />
              <MediaImage
                media={paragraph.field_dark_image}
                alt="site-banner"
                priority
                className="hidden dark:block h-full w-full"
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="lg:col-span-1 flex flex-col justify-center p-4">
        {paragraph.field_heading && (
          <h3 className="leading-none mb-4 mt-4 text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog">
            {paragraph.field_heading}
          </h3>
        )}
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "mb-0 max-w-2xl text-left text-primary-600",
            paragraph.field_heading 
          )}
        />
      </div>
    </div>
  </section>
  );
}
}