import { Paragraph } from "@/components/paragraph";
import type { Job_listing } from "@/lib/zod/job_listing";

interface Job_listingProps {
  job_listing: Job_listing;
}

export function Job_listing({ job_listing }: Job_listingProps) {
  return (
    <div className="grid gap-4">
      {job_listing.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
