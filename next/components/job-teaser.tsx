import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { JobTeaser } from "@/lib/zod/job-teaser";

interface JobTeaserProps {
  job: JobTeaser;
}

export function JobTeaser({ job }: JobTeaserProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Link
      href={job.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {job.title}
      </h3>
      {job.field_image && (
        <Image
          src={absoluteUrl(job.field_image.uri.url)}
          width={384}
          height={240}
          alt={job.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
    </Link>
  );
}
