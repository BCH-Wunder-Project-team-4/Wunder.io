import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { JobTeaser } from "@/lib/zod/job-teaser";

interface JobListItemProps {
  job: JobTeaser;
}

export function JobListItem({ job }: JobListItemProps) {
  const { t } = useTranslation();
  const author = job.uid?.display_name;
  const router = useRouter();
  const date = formatDate(job.created, router.locale);
  return (
    <Link
      href={job.path.alias}
      className={classNames(
        "relative mb-4 grid h-full rounded border  p-4 transition-all hover:shadow-md",
        job.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-white",
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {job.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
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
        <p>{job.field_excerpt}</p>
      </div>
    </Link>
  );
}
