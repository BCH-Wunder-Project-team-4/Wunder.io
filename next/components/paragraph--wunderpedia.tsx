import { FormattedText } from "@/components/formatted-text";
import Link from "next/link";
import { ParagraphWunderpedia as ParagraphWunderpediaType } from "@/lib/zod/paragraph";
import clsx from "clsx";

export function ParagraphWunderpedia({ paragraph }: { paragraph: ParagraphWunderpediaType }) {




  return (
    <div>
      <h2 className=" text-primary-600 sm:text-heading-xl text-heading-lg font-bold mb-12 dark:text-fog " data-aos="fade">{paragraph.field_heading ? paragraph.field_heading : ""}</h2>
      <div className="border-b-2 border-b-graysuit " data-aos="fade">
        <div
          className="flex flex-col md:flex-row justify-around align-middle pb-10" data-aos="fade">
          <h3 className="flex flex-row justify-center content-center flex-wrap text-xl text-primary-600 dark:text-fog"><Link className="hover:underline p-10" href={paragraph.field_links[0].full_url}>{paragraph.field_links[0].title}</Link></h3>
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "max-w-2xl text-topaz text-lg ",
            )}
          />
        </div>
      </div>
    </div>
  );
}