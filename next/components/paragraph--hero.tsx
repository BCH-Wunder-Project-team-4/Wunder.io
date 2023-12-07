import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { FormattedText } from "@/components/formatted-text";
import { Hero as HeroType } from "@/lib/zod/paragraph";
import Link from "next/link";
import { MediaImage } from "@/components/media--image";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";

export function ParagraphHero({ paragraph }: { paragraph: HeroType }) {


  return (
    <section id="hero" className="pt-5 pb-10">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 sm:grid-cols-12">
        <div className="mr-auto place-self-center px-8 py-8 sm:col-span-6  lg:py-16">
          {paragraph.field_heading && (
            <h1 className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 md:text-heading-lg">
              {paragraph.field_heading}
            </h1>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-6 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
              paragraph.field_heading && "mt-4",
            )}
          />
          <div className="gap-4 sm:text-left">
            {paragraph.field_primary_link && (
              <Link
                href={paragraph.field_primary_link.full_url}
                className={clsx(
                  buttonVariants({ variant: "primary" }),
                  "text-base mr-4 inline-flex px-5 py-3 my-3",
                )}
              >
                {paragraph.field_primary_link.title}
                <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
              </Link>
            )}

            {paragraph.field_secondary_link && (
              <Link
                href={paragraph.field_secondary_link.full_url}
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mt-3 inline-flex px-5 py-3 sm:mt-0",
                )}
              >
                {paragraph.field_secondary_link.title}
                <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
              </Link>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <MediaImage
            media={paragraph.field_image}
            alt="site-banner"
            priority
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
