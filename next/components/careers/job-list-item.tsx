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
      <div className={classNames("relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md")}>
        {job.field_image && (
          <div className="w-full h-48 mb-4">
            <Image
              src={absoluteUrl(job.field_image.uri.url)}
              layout="fill"
              objectFit="cover"
              alt={job.field_image.resourceIdObjMeta.alt}
            />
          </div>
        )}
      </div>
        <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
          {job.title}
        </h3>
    </Link>
  );
}