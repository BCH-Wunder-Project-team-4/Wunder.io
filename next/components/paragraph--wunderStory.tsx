import { ArrowRightIcon } from "lucide-react";
import { FormattedText } from "./formatted-text";
import Link from "next/link";
import WunderIcon from "@/styles/icons/wunder-carrot.svg";
import { WunderStory as WunderStoryType } from "@/lib/zod/paragraph";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";

export function ParagraphWunderStory({ paragraph }: { paragraph: WunderStoryType }) {

  return (
    <div className=" flex flex-col items-center pt-5 pb-10">
      <div className="w-fit ">
        <WunderIcon className="w-36 text-primary-600 dark:text-fog" />
      </div>
      <h1 className="text-primary-600 dark:text-fog text-heading-sm  font-bold sm:text-heading-xl py-7">Wunder Story</h1>
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "max-w-4xl text-topaz text-lg text-center pb-7",
        )}
      />
      <Link
        href={paragraph.field_secondary_link.full_url}
        className={clsx(
          buttonVariants({ variant: "secondary" }),
          "text-base mt-3 inline-flex px-5 py-3 sm:mt-0 ",
        )}
      >
        {paragraph.field_secondary_link.title}
        <ArrowRightIcon aria-hidden className="ml-3 h-6 w-6" />
      </Link>
    </div >
  )
}