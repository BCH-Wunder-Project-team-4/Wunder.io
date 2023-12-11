import {
  ExpertTalkTeaser as ExpertTalkTeaserType,
  validateAndCleanupExpertTalkTeaser,
} from "@/lib/zod/expertTalk-teaser";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  LanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";

import { ExpertTalkListItem } from "@/components/expertTalk/expertTalk-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestExpertTalksItems } from "@/lib/drupal/get-expertTalks";
import { useRef } from "react";
import { useTranslation } from "next-i18next";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

interface AllExpertTalksPageProps extends LayoutProps {
  expertTalkTeasers: ExpertTalkTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllExpertTalksPage({
  expertTalkTeasers = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("all-expertTalks")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("all-expertTalks")}</HeadingPage>
      <ul className="mt-4">
        {expertTalkTeasers?.map((expertTalk) => (
          <li key={expertTalk.id}>
            <ExpertTalkListItem expertTalk={expertTalk} />
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

export const getStaticProps: GetStaticProps<AllExpertTalksPageProps> = async (
  context,
) => {
  const pageRoot = "/all-expertTalks";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);
  const { expertTalks } = await getLatestExpertTalksItems({
    locale: context.locale
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      expertTalkTeasers: expertTalks.map((teaser) =>
        validateAndCleanupExpertTalkTeaser(teaser),
      ),
      languageLinks,
    },
    revalidate: 60,
  };
};
