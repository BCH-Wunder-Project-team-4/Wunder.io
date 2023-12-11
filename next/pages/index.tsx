import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { ArticleTeasers } from "@/components/article-teasers";
import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";

import { Divider } from "@/ui/divider";
import { validateAndCleanupEventTeaser } from "@/lib/zod/events-teaser";
import { getLatestEventsItems } from "@/lib/drupal/get-events";
import { Events } from "@/components/events/events";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  articles: ArticleTeaser[];
  eventsTeasers: any[];
}

export default function IndexPage({
  frontpage,
  articles,
  eventsTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <div className="grid gap-4">
        {frontpage?.field_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div>
      <Divider className="max-w-4xl" />
      <ArticleTeasers
        articles={articles}
        heading={t("promoted-articles")}
      />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <Events events={eventsTeasers} heading={t("Coming events")}></Events>

      <ContactList />
      <LogoStrip />
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context,
) => {
  const frontpage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--frontpage",
      context,
      {
        params: getNodePageJsonApiParams("node--frontpage").getQueryObject(),
      },
    )
  ).at(0);

  const {articles} = await getLatestArticlesItems({limit:3, locale: context.locale})

  const { events } = await getLatestEventsItems({ limit: 3, locale: context.locale });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      articles: articles.map((teaser) =>
      validateAndCleanupArticleTeaser(teaser),
      ),
      eventsTeasers: events.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
    },
    revalidate: 60,
  };
};
