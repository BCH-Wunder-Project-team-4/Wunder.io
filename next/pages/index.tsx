import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { ExpertTalkTeaser, validateAndCleanupExpertTalkTeaser } from "@/lib/zod/expertTalk-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import { Divider } from "@/ui/divider";
import { DrupalNode } from "next-drupal";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestEventsItems } from "@/lib/drupal/get-events";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { useTranslation } from "next-i18next";
import { validateAndCleanupEventTeaser } from "@/lib/zod/events-teaser";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  promotedArticleTeasers: ArticleTeaser[];
  promotedExpertTalkTeasers: ExpertTalkTeaser[];
  eventsTeasers: any[];
}

export default function IndexPage({
  frontpage,
  promotedArticleTeasers,
  promotedExpertTalkTeasers,
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

  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "filter[promote]": 1,
      "fields[node--article]": "title,path,field_image,uid,created",
      include: "field_image,uid",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });
  const promotedExpertTalkTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--expert_talks", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "filter[promote]": 1,
      "fields[node--expert_talks]": "title,path,field_image,uid,created,field_experts_photo,field_name,field_excerpt",
      include: "field_image,uid,field_experts_photo",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });

  const { events } = await getLatestEventsItems({ limit: 3, locale: context.locale });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      promotedArticleTeasers: promotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
      promotedExpertTalkTeasers: promotedExpertTalkTeasers.map((teaser) =>
        validateAndCleanupExpertTalkTeaser(teaser),
      ),
      eventsTeasers: events.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
    },
    revalidate: 60,
  };
};
