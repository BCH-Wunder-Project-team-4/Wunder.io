import {
  ArticleTeaser as ArticleTeaserType,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  LanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";
import { Pagination, PaginationProps } from "@/components/pagination";

import { ArticleListItem } from "@/components/article-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { useRef } from "react";
import { useTranslation } from "next-i18next";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

interface AllArticlesPageProps extends LayoutProps {
  articleTeasers: ArticleTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllArticlesPage({
  articleTeasers = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("all-articles")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("all-articles")}</HeadingPage>
      <ul className="mt-4">
        {articleTeasers?.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <div>
        <button className={clsx(
          buttonVariants({ variant: "primary" }),
          "text-base mr-4 mt-4 inline-flex px-5 py-3",
        )}
        >
          {t("load-more")}
          <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" /></button>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<AllArticlesPageProps> = async (
  context,
) => {
  const pageRoot = "/all-articles";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);
  const { articles } = await getLatestArticlesItems({
    locale: context.locale
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      articleTeasers: articles.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
      languageLinks,
    },
    revalidate: 60,
  };
};
