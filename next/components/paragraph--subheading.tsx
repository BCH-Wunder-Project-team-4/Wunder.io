import clsx from "clsx";
import { Subheading as SubheadingType } from "@/lib/zod/paragraph";

export function ParagraphSubheading({ paragraph }: { paragraph: SubheadingType }) {
  return (
    <>
      {paragraph.field_subheading && (
        
        <h2 className={
          "leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 dark:text-primary-200 md:text-heading-md"}>{paragraph.field_subheading}</h2>
      )}
    </>
  );
}
