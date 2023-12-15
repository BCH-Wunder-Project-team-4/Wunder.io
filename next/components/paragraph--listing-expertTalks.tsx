import { ExpertTalksListing } from "@/components/expertTalk/expertTalks-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ListingExpertTalks } from "@/lib/zod/paragraph";

export function ParagraphListingExpertTalks({
  paragraph,
}: {
  paragraph: ListingExpertTalks;
}) {
  return (
    <div className="my-10 max-w-5xl">

      {
        paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )
      }
      <ExpertTalksListing listingId={paragraph.id} limit={paragraph.field_limit} />
    </div>

  );
}

