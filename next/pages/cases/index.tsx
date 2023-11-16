import React, { useMemo, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { CaseTeaser } from "@/components/cases/case-teaser";

import { HeadingPage } from "@/components/heading--page-centered";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalNode } from "next-drupal";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

interface CasesPageProps extends LayoutProps {
  languageLinks: LanguageLinks;
  cases: DrupalNode[];
}

export default function CasesPage({
  cases = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Meta title={t("Cases")} metatags={[]} />
      <div className="w-full max-w-screen-lg p-4 space-y-4">
        <HeadingPage className="pt-2">{t("Our success stories")}</HeadingPage>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cases.map((caseItem, index) => (
            <CaseTeaser key={index} caseItem={caseItem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<CasesPageProps> = async (context) => {

  const pageRoot = "/cases";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  const cases = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--case", context, {
    params: getNodePageJsonApiParams("node--case").getQueryObject(),
  });

  console.log(cases)

  return {
    props: {
      ...(await getCommonPageProps(context)),
      languageLinks,
      cases,
    },
    revalidate: 60,
  };
}
