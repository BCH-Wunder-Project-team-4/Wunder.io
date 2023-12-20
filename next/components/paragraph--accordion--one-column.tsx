import { Accordion } from "@/ui/accordion";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import Link from "next/link";
import { Paragraph } from "@/components/paragraph";
import { Accordion as ParagraphAccordion } from "@/lib/zod/paragraph";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";

export function ParagraphAccordionOneColumn({
  paragraph,
}: {
  paragraph: ParagraphAccordion;
}) {
  return (
    < >
      <div data-aos="fade">

        {paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )}

        {paragraph.field_formatted_text && (
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "text-left text-md/xl text-scapaflow sm:text-lg",
              paragraph.field_heading && "mt-4",
            )}
          />
        )}
        {paragraph.field_primary_link && (
          <Link
            href={paragraph.field_primary_link.full_url}
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 inline-flex max-w-sm px-5 py-3",
            )}
          >
            {paragraph.field_primary_link.title}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}

        <Accordion

          items={paragraph.field_accordion_items?.map((item) => ({
            id: item.id,
            heading: item.field_heading,
            content: (
              <div className="grid gap-4" data-aos="fade">
                {item.field_content_elements?.map((paragraph) => (
                  <Paragraph key={paragraph.id} paragraph={paragraph} />
                ))}
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
}
