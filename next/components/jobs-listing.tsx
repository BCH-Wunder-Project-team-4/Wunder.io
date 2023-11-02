import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";

import { JobTeaser } from "@/components/job-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { JobTeaser as JobTeaserType } from "@/lib/zod/job-teaser";

export function JobsListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`jobs-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/jobs-listing/${router.locale}?limit=${limit}`,
        {
          headers: {
            "accept-language": router.locale,
          },
        },
      );

      return await response.json();
    },
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          data?.map((job: JobTeaserType) => (
            <li key={job.id}>
              <JobTeaser job={job} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
