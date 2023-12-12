import { EventTeaserComponent } from "@/components/events/event";
import { EventTeaser as EventTeaserType } from "@/lib/zod/events-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function EventsListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`events-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/events-listing/${router.locale}?limit=${limit}`,
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
      <ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8">
        {!isLoading &&
          data?.map((event: EventTeaserType) => (
            <li key={event.id} className="flex flex-row justify-center">
              <EventTeaserComponent event={event} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}