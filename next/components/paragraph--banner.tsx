import RoundedStickIcon from "@/styles/icons/rounded-stick.svg";
import clsx from "clsx";
import Link from "next/link";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Banner as BannerType } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

export function ParagraphBanner({ paragraph }: { paragraph: BannerType }) {
  return (
    <section id="banner" className="bg-mischka mb-6">
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12">
        <div className="mr-auto place-self-center px-8 py-8 lg:col-span-6 lg:py-16">
          {paragraph.field_heading && (
            <h1 className="mb-2 max-w-2xl text-left text-md/xl text-steelgray sm:text-lg md:text-xl lg:text-xl tracking-tight">
              <RoundedStickIcon className="inline-block h-5 w-5 mr-1 mb-1 text-hugs" />
              {paragraph.field_heading}
            </h1>
          )}
          {paragraph.field_slogan && (
            <h2 className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 md:text-heading-lg">
              {paragraph.field_slogan}
            </h2>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-6 max-w-2xl text-left text-md/xl text-steelgray sm:text-md md:text-lg lg:mb-8 lg:text-lg",
              paragraph.field_heading && "mt-4",
            )}
          />
          <div className="gap-4 sm:text-left">
            {paragraph.field_primary_link && (
              <Link
                href={paragraph.field_primary_link.full_url}
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mr-4 inline-flex px-5 py-3",
                )}
              >
                {paragraph.field_primary_link.title}
                <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
              </Link>
            )}
          </div>
        </div>
        <div className="hidden lg:col-span-6 lg:mt-0 lg:flex">
          <MediaImage
            media={paragraph.field_image}
            alt="page-banner"
            priority
          />
        </div>
      </div>
    </section>
  );
}
