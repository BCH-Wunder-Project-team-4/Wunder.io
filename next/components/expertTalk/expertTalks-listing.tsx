import { ExpertTalkTeaser } from "@/components/expertTalk/expertTalk-teaser";
import { ExpertTalkTeaser as ExpertTalkTeaserType } from "@/lib/zod/expertTalk-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function ExpertTalksListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`expertTalks-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/expertTalks-listing/${router.locale}?limit=${limit}`,
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
      <ul className="mt-4 flex overflow-x-auto no-scrollbar">
        {!isLoading &&
          data?.map((expertTalk: ExpertTalkTeaserType) => (
            <li key={expertTalk.id} className="flex flex-nowrap lg:ml-20 md:ml-10 ml-5 ">
              <ExpertTalkTeaser expertTalk={expertTalk} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
