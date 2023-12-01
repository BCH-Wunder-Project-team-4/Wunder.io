import { ServicesListing } from "@/components/offering/services-listing";
import { Services } from "@/lib/zod/paragraph";

export function ParagraphServices({
  paragraph,
}: {
  paragraph: Services;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <h1               className={
          "leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
        }>{paragraph.field_heading}</h1>
      )}
      <ServicesListing listingId={paragraph.id}/>
    </>
  );
}
