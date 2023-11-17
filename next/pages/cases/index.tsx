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

  const [industries, setIndustries] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [chosenIndustry, setChosenIndustry] = useState<string>("all");
  const [chosenSolution, setChosenSolution] = useState<string>("all");
  const [chosenTechnology, setChosenTechnology] = useState<string>("all");

  useMemo(() => {
    const industries = cases.flatMap((caseItem) => caseItem.field_industry.map((industry) => industry.name));
    const solutions = cases.flatMap((caseItem) => caseItem.field_solution.map((solution) => solution.name));
    const technologies = cases.flatMap((caseItem) => caseItem.field_technology.map((technology) => technology.name));
    setIndustries(Array.from(new Set(industries)));
    setSolutions(Array.from(new Set(solutions)));
    setTechnologies(Array.from(new Set(technologies)));
  }, [cases]);

  const filteredCases = cases.filter((caseItem) => {
    if (chosenIndustry !== "all" && !caseItem.field_industry.some((industry) => industry.name === chosenIndustry)) {
      return false;
    }
    if (chosenSolution !== "all" && !caseItem.field_solution.some((solution) => solution.name === chosenSolution)) {
      return false;
    }
    if (chosenTechnology !== "all" && !caseItem.field_technology.some((technology) => technology.name === chosenTechnology)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <Meta title={t("Cases")} metatags={[]} />
      <div className="w-full max-w-screen-lg p-4 space-y-4">
        <HeadingPage className="pt-2">{t("Our success stories")}</HeadingPage>
        <select onChange={e => setChosenIndustry(e.target.value)}>
          <option value="all">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
        <select onChange={e => setChosenSolution(e.target.value)}>
          <option value="all">All Solutions</option>
          {solutions.map((solution) => (
            <option key={solution} value={solution}>{solution}</option>
          ))}
        </select>
        <select onChange={e => setChosenTechnology(e.target.value)}>
          <option value="all">All Technologies</option>
          {technologies.map((technology) => (
            <option key={technology} value={technology}>{technology}</option>
          ))}
        </select>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredCases.map((caseItem, index) => (
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

  const cases = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--case", context, 
  {
    params: getNodePageJsonApiParams("node--case").getQueryObject(),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      languageLinks,
      cases,
    },
    revalidate: 60,
  };
}
