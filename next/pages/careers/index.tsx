import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

import { JobListItem } from "@/components/job/job-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getLatestJobsItems } from "@/lib/drupal/get-jobs";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { JobTeaser as JobTeaserType, validateAndCleanupJobTeaser } from "@/lib/zod/job-teaser";
import { FormattedText } from "@/components/formatted-text";

interface AllJobsPageProps extends LayoutProps {
  jobTeasers: JobTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllJobsPage({
  jobTeasers = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("Careers")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("Become a part of our team")}</HeadingPage>
      <FormattedText html={t("We're on the lookout for dynamic individuals like you to join our team. Explore exciting career prospects and be a part of a collaborative environment that values innovation, growth and creativity. Embrace the opportunity to contribute your unique talents and expertise to our collective success.")} className="text-stone"/>
      <HeadingPage>{t("Open Positions")}</HeadingPage>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {jobTeasers?.map((job) => (
              <JobListItem job={job} />
          ))}
      </ul>    
    </>
  );
}

export const getStaticProps: GetStaticProps<AllJobsPageProps> = async (context) => {
  // Fetch the job teasers.
  const { jobs } = await getLatestJobsItems({ limit: 10, locale: context.locale });

  const pageRoot = "/careers";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      jobTeasers: jobs.map((teaser) => validateAndCleanupJobTeaser(teaser)),
      languageLinks,
    },
    revalidate: 60,
  };
}