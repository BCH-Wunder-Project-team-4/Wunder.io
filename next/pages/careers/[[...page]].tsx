import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

import { JobListItem } from "@/components/job-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getLatestJobsItems } from "@/lib/drupal/get-jobs";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  JobTeaser as JobTeaserType,
  validateAndCleanupJobTeaser,
} from "@/lib/zod/job-teaser";

interface AllJobsPageProps extends LayoutProps {
  jobTeasers: JobTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
}

export default function AllJobsPage({
  jobTeasers = [],
  paginationProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("Careers")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("Join us!")}</HeadingPage>
      <ul className="mt-4">
        {jobTeasers?.map((job) => (
          <li key={job.id}>
            <JobListItem job={job} />
          </li>
        ))}
      </ul>
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

export const getStaticProps: GetStaticProps<AllJobsPageProps> = async (
  context,
) => {
  // Get the page parameter:
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, jobs } = await getLatestJobsItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/careers";
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
      jobTeasers: jobs.map((teaser) =>
        validateAndCleanupJobTeaser(teaser),
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
