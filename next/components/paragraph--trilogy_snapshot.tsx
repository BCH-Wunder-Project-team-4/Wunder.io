import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { TrilogySnapshot as TrilogySnapshotType } from "@/lib/zod/paragraph";
import clsx from "clsx";
import Link from "next/link";

export function ParagraphTrilogySnapshot({
  paragraph,
}: {
  paragraph: TrilogySnapshotType;
}) {
  return (
    <section
      id="trilogy-snapshot"
      className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16"
    >
      <div>
        <h2
          className={
            "leading-none max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
          }
        >
          {paragraph.field_heading}
        </h2>
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "mb-0 max-w-2xl text-left text-md/xl",
            paragraph.field_heading && "mt-4",
          )}
        />
        <div className="gap-4 sm:text-left">
          {paragraph.field_primary_link && (
            <Link
              href={paragraph.field_primary_link.full_url}
              className="dark:text-fog text-primary-600 text-base inline-flex hover:underline mt-2"
            >
              {paragraph.field_primary_link.title}
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-rows-[60px_minmax(120px,_1fr)_100px] grid-flow-col justify-items-center items-center">
        <MediaImage
          className="md:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] row-span-2 row-start-2"
          media={paragraph.field_trilogy_images[0]}
          alt="site-image"
          priority
        />
        <MediaImage
          className="md:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] row-span-3 row-end-4"
          media={paragraph.field_trilogy_images[1]}
          alt="site-image"
          priority
        />
        <MediaImage
          className="md:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px] row-span-2 row-start-2"
          media={paragraph.field_trilogy_images[2]}
          alt="site-image"
          priority
        />
      </div>
    </section>
  );
}
