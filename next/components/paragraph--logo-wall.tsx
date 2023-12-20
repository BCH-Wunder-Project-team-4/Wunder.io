import { ClientsListing } from "@/components/logo-wall/client-listing";
import { LogoWall } from "@/lib/zod/paragraph";

export function ParagraphLogoWall({
  paragraph,
}: {
  paragraph: LogoWall;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <h1 className={
          "leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
        } data-aos="fade">{paragraph.field_heading}</h1>
      )}
      <ClientsListing listingId={paragraph.id} />
    </>
  );
}
