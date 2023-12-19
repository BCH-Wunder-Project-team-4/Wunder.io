import { GetStaticProps, InferGetStaticPropsType } from "next";
import { JobTeaser as JobTeaserType, validateAndCleanupJobTeaser } from "@/lib/zod/job-teaser";
import {
  LanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";
import React, { useMemo, useState } from 'react';

import { CareersNewsletterForm } from "@/components/careers/careers-newsletter";
import { DrupalNode } from "next-drupal";
import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page-centered";
import { JobListItem } from "@/components/careers/job-list-item";
import { LayoutProps } from "@/components/layout";
import { LogoWall } from '@/components/logo-wall';
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestJobsItems } from "@/lib/drupal/get-jobs";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { useRef } from "react";
import { useTranslation } from "next-i18next";

interface AllJobsPageProps extends LayoutProps {
  jobTeasers: JobTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllJobsPage({
  jobTeasers = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState<string[]>([]);
  const [offices, setOffices] = useState<string[]>([]);
  const [chosenCountry, setChosenCountry] = useState<string>("all");
  const [chosenOffice, setChosenOffice] = useState<string>("all");

  useMemo(() => {
    const countries = jobTeasers.flatMap((job) => job.field_country.map((country) => country.name));
    const offices = jobTeasers.flatMap((job) => job.field_office.map((office) => office.name));
    setCountries(Array.from(new Set(countries)));
    setOffices(Array.from(new Set(offices)));
  }, [jobTeasers]);

  const filteredJobs = jobTeasers.filter((job) => {
    if (chosenCountry !== "all" && !job.field_country.some((country) => country.name === chosenCountry)) {
      return false;
    }
    if (chosenOffice !== "all" && !job.field_office.some((office) => office.name === chosenOffice)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <Meta title={t("Careers")} metatags={[]} />
      <div className="w-full max-w-screen-lg p-4 space-y-4">
        <HeadingPage className="pt-2">{t("careers-title")}</HeadingPage>
        <FormattedText html={t("careers-intro")} className="text-center" />
        <HeadingPage>{t("careers-positions")}</HeadingPage>
        <div className="gap-2 flex flex-wrap items-center">
        <select className="text-primary-600 dark:text-fog p-1 border rounded bg-mischka dark:bg-steelgray w-32" onChange={e => setChosenCountry(e.target.value)}>
          <option value="all">{t("all-countries")}</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select className="text-primary-600 dark:text-fog p-1 border rounded bg-mischka dark:bg-steelgray w-32" onChange={e => setChosenOffice(e.target.value)}>
          <option value="all">{t("all-offices")}</option>
          {offices.map((office) => (
            <option key={office} value={office}>{office}</option>
          ))}
        </select>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <JobListItem key={index} job={job} />
          ))}
        </ul>
      </div>
      <HeadingPage>{t("careers-subscribe")}</HeadingPage>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormattedText html={t("careers-newsletter-title")} className="text-xl" />
          <FormattedText html={t("careers-newsletter-info")} />
        </div>
        <div className="flex-1">
          <CareersNewsletterForm />
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
