import { EventsListing } from "@/components/events/events-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ListingEvents } from "@/lib/zod/paragraph";

export function ParagraphListingEvents({
  paragraph,
}: {
  paragraph: ListingEvents;
}) {
  return (
    <div className="my-10 max-w-full">

      {
        paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )
      }
      < EventsListing listingId={paragraph.id} limit={paragraph.field_limit} />
    </div>

  );
}
