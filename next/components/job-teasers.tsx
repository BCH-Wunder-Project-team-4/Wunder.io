import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { JobTeaser } from "@/components/job-teaser";
import { JobTeaser as JobTeaserType } from "@/lib/zod/job-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestJobsProps {
  jobs?: JobTeaserType[];
  heading: string;
}

export function JobTeasers({ jobs, heading }: LatestJobsProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {jobs?.map((job) => (
          <li key={job.id}>
            <JobTeaser job={job} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!jobs?.length && <p className="py-4">{t("no-content-found")}</p>}
        {jobs?.length && (
          <Link
            href="/all-jobs"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("all-jobs")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
