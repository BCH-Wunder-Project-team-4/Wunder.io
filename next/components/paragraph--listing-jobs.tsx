import { JobsListing } from "@/components/jobs-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ListingJobs } from "@/lib/zod/paragraph";

export function ParagraphListingJobs({
  paragraph,
}: {
  paragraph: ListingJobs;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <JobsListing listingId={paragraph.id} limit={paragraph.field_limit} />
    </>
  );
}
