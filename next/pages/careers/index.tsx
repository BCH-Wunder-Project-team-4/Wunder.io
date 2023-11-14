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
        <HeadingPage className="pt-1">{t("careers-title")}</HeadingPage>
        <FormattedText html={t("careers-intro")} className="text-stone text-center" />
        <HeadingPage>{t("careers-positions")}</HeadingPage>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {jobTeasers?.map((job, index) => (
            <JobListItem key={index} job={job} />
          ))}
        </ul>
      </div>
      <HeadingPage>{t("Subscribe to our careers newsletter")}</HeadingPage>
      <div className="flex">
        <div className="flex-1">
          <FormattedText html={t("Welcome to our careers newsletter!")} className="text-xl" />
          <FormattedText html={t("Don't miss out on the latest opportunities and industry insights. Subscribe now to stay ahead of the curve and receive exclusive updates directly in your inbox. Join our ever-growing community of passionate professionals and unlock the door to endless career possibilities. Fill in the form and be part of our vibrant network today!")} className="text-stone" />
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

  return {
    props: {
      ...(await getCommonPageProps(context)),
      jobTeasers: jobs.map((teaser) => validateAndCleanupJobTeaser(teaser)),
      languageLinks,
    },
    revalidate: 60,
  };
}
