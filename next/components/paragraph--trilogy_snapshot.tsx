import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { TrilogySnapshot as TrilogySnapshotType } from "@/lib/zod/paragraph";
import clsx from "clsx";
import Link from "next/link";
import { HeadingParagraph } from "./heading--paragraph";

import { buttonVariants } from "@/ui/button";

export function ParagraphTrilogySnapshot({
  paragraph,
}: {
  paragraph: TrilogySnapshotType;
}) {
  return (
    <section id="trilogy-snapshot" className="mb-6">
      <div>
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "mb-0 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-0 lg:text-lg",
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
            </Link>
          )}
        </div>
      </div>
      <div className="grid-rows-3">
        <MediaImage
          className="w-36 h-36 object-cover"
          media={paragraph.field_trilogy_images[0]}
          alt="site-image"
          priority
        />
        <MediaImage
          className="w-36 h-36 object-cover"
          media={paragraph.field_trilogy_images[1]}
          alt="site-image"
          priority
        />
        <MediaImage
          className="w-36 h-36 object-cover"
          media={paragraph.field_trilogy_images[2]}
          alt="site-image"
          priority
        />
      </div>
    </section>
  );
}
