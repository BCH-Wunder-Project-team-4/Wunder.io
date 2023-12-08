import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

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
      {isLoading && <LoadingSpinner />}
      <ul className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-10">
        {!isLoading &&
          data?.map((article: ArticleTeaserType) => (
            <li key={article.id}>
              <ArticleTeaser article={article} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}