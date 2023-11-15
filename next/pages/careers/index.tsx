import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

import { JobListItem } from "@/components/careers/job-list-item";
import { HeadingPage } from "@/components/heading--page-centered";
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
import { CareersNewsletterForm } from "@/components/careers/careers-newsletter";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalNode } from "next-drupal";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

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
    <div>
      <Meta title={t("Careers")} metatags={[]} />
      <div className="w-full max-w-screen-lg p-4 space-y-4">
        <HeadingPage className="pt-2">{t("careers-title")}</HeadingPage>
        <FormattedText html={t("careers-intro")} className="text-stone text-center" />
        <HeadingPage>{t("careers-positions")}</HeadingPage>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {jobTeasers?.map((job, index) => (
            <JobListItem key={index} job={job} />
          ))}
        </ul>
      </div>
      <HeadingPage>{t("careers-subscribe")}</HeadingPage>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormattedText html={t("careers-newsletter-title")} className="text-xl" />
          <FormattedText html={t("careers-newsletter-info")} className="text-stone" />
        </div>
        <div className="flex-1">
          <CareersNewsletterForm/>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AllJobsPageProps> = async (context) => {
  // Fetch the job teasers.
  const { jobs } = await getLatestJobsItems({ limit: 10, locale: context.locale });

  const pageRoot = "/careers";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  const openPositions = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--job", context, {
    params: getNodePageJsonApiParams("node--job").getQueryObject(),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      jobTeasers: jobs.map((teaser) => validateAndCleanupJobTeaser(teaser)),
      languageLinks,
    },
    revalidate: 60,
  };
}
