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
      <div className={classNames("relative grid rounded bg-white transition-all hover:shadow-md")}>
        {job.field_image && (
          <div className="w-full h-38">
            <Image
              src={absoluteUrl(job.field_image.uri.url)}
              className="object-cover"
              alt={job.field_image.resourceIdObjMeta.alt}
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
        <div>
          {job.field_country && job.field_country.map((country) => country.name).join(', ')}
        </div>
        <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
          {job.title}
        </h3>
    </Link>
  );
}