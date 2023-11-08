import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { JobTeaser } from "@/lib/zod/job-teaser";

interface JobListItemProps {
  job: JobTeaser;
}

export function JobListItem({ job }: JobListItemProps) {
  return (
    <Link href={job.path.alias}>
        <div className={classNames("relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md", job.sticky ? "border-primary-100 bg-primary-50" : "border-finnishwinter bg-white")}>
          <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
            {job.title}
          </h3>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            {job.field_image && (
              <Image
                src={absoluteUrl(job.field_image.uri.url)}
                width={500}
                height={300}
                className="w-full sm:w-40"
                alt={job.field_image.resourceIdObjMeta.alt}
              />
            )}
          </div>
        </div>
    </Link>
  );
}

