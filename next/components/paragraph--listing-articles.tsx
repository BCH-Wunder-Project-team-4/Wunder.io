import { ArticlesListing } from "@/components/articles-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ListingArticles } from "@/lib/zod/paragraph";

export function ParagraphListingArticles({
  paragraph,
}: {
  paragraph: ListingArticles;
}) {
  return (
    <div className="my-10 max-w-full">

      {
        paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )
      }
      < ArticlesListing listingId={paragraph.id} limit={paragraph.field_limit} />
    </div>

  );
}
