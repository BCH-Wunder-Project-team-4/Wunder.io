import { ExpertTalkTeaser } from "@/components/expertTalk/expertTalk-teaser";
import { ExpertTalkTeaser as ExpertTalkTeaserType } from "@/lib/zod/expertTalk-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/ui/button";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

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
      <ul className=" flex overflow-x-auto no-scrollbar mb-10 items-center">
        {!isLoading &&
          data?.map((expertTalk: ExpertTalkTeaserType) => (
            <li
              key={expertTalk.id}
              className="flex flex-nowrap lg:mx-10 md:mx-5 mx-2 my-8 "
            >
              <ExpertTalkTeaser expertTalk={expertTalk} />
            </li>
          ))}
        <li>
          <Link
            href={`/all-expertTalks/`}
            className={clsx(
              buttonVariants({ variant: "secondary" }),
              "text-base mr-4 inline-flex px-5 py-3 mb-6",
            )}
          >
            {t("All expert talks")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        </li>
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
