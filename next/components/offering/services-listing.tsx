import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";

import { ServiceTeaser } from "@/components/offering/service-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ServiceTeaser as ServiceTeaserType } from "@/lib/zod/service-teaser";

export function ServicesListing({
  listingId,
}: {
  listingId: string;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`services-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/services-listing/${router.locale}`,
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
          data?.map((service: ServiceTeaserType) => (
            <li key={service.id}>
              <ServiceTeaser service={service} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
