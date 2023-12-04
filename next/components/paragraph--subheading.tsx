import clsx from "clsx";
import { Subheading as SubheadingType } from "@/lib/zod/paragraph";

export function ParagraphSubheading({ paragraph }: { paragraph: SubheadingType }) {
  return (
    <>
      {paragraph.field_subheading && (
        
        <h2 className={
          "leading-none mt-8 mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"}>{paragraph.field_subheading}</h2>
      )}
    </>
  );
}
