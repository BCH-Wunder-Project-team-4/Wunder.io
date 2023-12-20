import ArrowIcon from "@/styles/icons/arrow-down.svg";
import ExternalLinkIcon from "@/styles/icons/external.svg";
import Link from "next/link";
import { MediaImage } from "@/components/media--image";
import { TextAndImage as TextAndImageType } from "@/lib/zod/paragraph";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";

export function ParagraphTextAndImage({
  paragraph,
}: {
  paragraph: TextAndImageType;
}) {
  if (
    paragraph.field_image_position === "Right" ||
    paragraph.field_image_position === null
  ) {
    return (
      <section
        id="text-and-image"
        className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16"
      >
        <div>
          <h2
            className={
              "leading-none max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
            } data-aos="fade"
          >
            {paragraph.field_heading}
          </h2>
          <p className="mb-4 max-w-2xl text-left text-md/xl mt-4 text-steelgray dark:text-mischka" data-aos="fade">
            {paragraph.field_text}
          </p>
          <div className="gap-4 sm:text-left">
            {paragraph.field_primary_link && (
              <Link
                href={paragraph.field_primary_link.full_url}
                target={
                  paragraph.field_link_type === "External"
                    ? "_blank"
                    : undefined
                }
                rel={
                  paragraph.field_link_type === "External"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mr-4 inline-flex px-5 py-3",
                )}
                data-aos="fade"
              >
                {paragraph.field_primary_link.title}
                {paragraph.field_link_type === "External" && (
                  <ExternalLinkIcon aria-hidden className="ml-3 h-6 w-6" />
                )}
                {paragraph.field_link_type === "Internal" && (
                  <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
                )}
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center lg:items-start">
          <MediaImage
            className="object-cover lg:w-5/6 lg:h-6/6"
            media={paragraph.field_image}
            alt="site-image"
            priority
            data-aos="fade"
          />
        </div>
      </section>
    );
  } else {
    return (
      <section
        id="text-and-image"
        className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16"
      >
        <div className="flex items-center lg:items-start">
          <MediaImage
            className="object-cover lg:w-5/6 lg:h-6/6"
            media={paragraph.field_image}
            alt="site-image"
            priority
            data-aos="fade"
          />
        </div>
        <div>
          <h2
            className={
              "leading-none max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
            }
            data-aos="fade"
          >
            {paragraph.field_heading}
          </h2>
          <p className="mb-4 max-w-2xl text-left text-md/xl mt-4 text-steelgray dark:text-mischka" data-aos="fade">
            {paragraph.field_text}
          </p>
          <div className="gap-4 sm:text-left" data-aos="fade">
            {paragraph.field_primary_link && (
              <Link
                href={paragraph.field_primary_link.full_url}
                target={
                  paragraph.field_link_type === "External"
                    ? "_blank"
                    : undefined
                }
                rel={
                  paragraph.field_link_type === "External"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mr-4 inline-flex px-5 py-3",
                )}
              >
                {paragraph.field_primary_link.title}
                {paragraph.field_link_type === "External" && (
                  <ExternalLinkIcon aria-hidden className="ml-3 h-6 w-6" />
                )}
                {paragraph.field_link_type === "Internal" && (
                  <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
                )}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }
}
