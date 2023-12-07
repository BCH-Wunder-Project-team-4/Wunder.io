import {
  ExpertTalkTeaser as ExpertTalkTeaserType,
  validateAndCleanupExpertTalkTeaser,
} from "@/lib/zod/expertTalk-teaser";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  LanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";
import { Pagination, PaginationProps } from "@/components/pagination";

import { ExpertTalkListItem } from "@/components/expertTalk/expertTalk-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestExpertTalksItems } from "@/lib/drupal/get-expertTalks";
import { useRef } from "react";
import { useTranslation } from "next-i18next";

interface AllExpertTalksPageProps extends LayoutProps {
  expertTalkTeasers: ExpertTalkTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
}

export default function AllExpertTalksPage({
  expertTalkTeasers = [],
  paginationProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={"Expert talks"} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{"Expert talks2"}</HeadingPage>
      <ul className="mt-4">
        {expertTalkTeasers?.map((expertTalk) => (
          <li key={expertTalk.id}>
            <ExpertTalkListItem expertTalk={expertTalk} />
          </li>
        ))}
      </ul>
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: ["1"] },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<AllExpertTalksPageProps> = async (
  context,
) => {
  // Get the page parameter:
  const page = context.params?.page;

  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, expertTalks } = await getLatestExpertTalksItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/all-expertTalks";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      expertTalkTeasers: expertTalks.map((teaser) =>
        validateAndCleanupExpertTalkTeaser(teaser),
      ),
      paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      },
      languageLinks,
    },
    revalidate: 60,
  };
};
