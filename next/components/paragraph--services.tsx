import { Services } from "@/lib/zod/paragraph";
import { ServicesListing } from "@/components/offering/services-listing";

export function ParagraphServices({
  paragraph,
}: {
  paragraph: Services;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <h1 className={
          "leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
        } data-aos="fade">{paragraph.field_heading}</h1>
      )}
      <ServicesListing listingId={paragraph.id} />
    </>
  );
}
