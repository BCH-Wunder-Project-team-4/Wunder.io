import RoundedStickIcon from "@/styles/icons/rounded-stick.svg";
import clsx from "clsx";
import Link from "next/link";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Sectionbg as SectionType } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

export function ParagraphSectionbg({ paragraph }: { paragraph: SectionType }) {
  return (
    <section id="section" className="mb-6 relative overflow-hidden">
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12">
        <div className="mr-auto place-self-center md:px-0 lg:pr-8 lg:pl-0 sm py-8 lg:col-span-6 lg:py-16">
          <div className="relative z-10">
            {paragraph.field_heading && (
              <h1 className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 dark:text-mischka md:text-heading-sm">
                {paragraph.field_heading}
              </h1>
            )}
            {paragraph.field_formatted_text && (
              <FormattedText
                html={paragraph.field_formatted_text.processed}
                className={clsx(
                  "mb-6 max-w-2xl text-left text-md/xl sm:text-md md:text-lg lg:mb-8 lg:text-lg",
                  paragraph.field_heading && "mt-4",
                )}
              />
            )}
            <div className="gap-4 sm:text-left">
              {paragraph.field_primary_link && (
                <Link
                  href={paragraph.field_primary_link.full_url}
                  className={clsx(
                    buttonVariants({ variant: "banner_cta" }),
                    "text-base mr-4 inline-flex px-5 py-3",
                  )}
                >
                  {paragraph.field_primary_link.title}
                  <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="hidden lg:col-span-6 lg:mt-0 lg:flex">
          {paragraph.field_image && (
            <div className="absolute top-0 left-0 w-full h-full">
              <MediaImage 
              media={paragraph.field_image} alt="page-banner" 
              priority
              className="object-cover w-full h-full" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-black"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
