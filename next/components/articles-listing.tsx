import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/ui/button";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

export function ArticlesListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`articles-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/articles-listing/${router.locale}?limit=${limit}`,
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
      <div>
        {isLoading && <LoadingSpinner />}
        <ul className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {!isLoading &&
            data?.map((article: ArticleTeaserType) => (
              <li key={article.id} className="my-8">
                <ArticleTeaser article={article} />
              </li>
            ))}
        </ul>
        {!data?.length && !isLoading && (
          <p className="py-4">{t("no-content-found")}</p>
        )}
        <Link
          href={`/all-articles/`}
          className={clsx(
            buttonVariants({ variant: "secondary" }),
            "text-base mr-4 inline-flex px-5 py-3 mb-6",
          )}
        >
          {t("View all articles")}
          <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
        </Link>
      </div>
    </>
  );
}
