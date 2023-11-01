import { Paragraph } from "@/components/paragraph";
import type { Job } from "@/lib/zod/job";

interface JobProps {
  job: Job;
}

export function Job({ job }: JobProps) {
  return (
    <div className="grid gap-4">
      {job.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
