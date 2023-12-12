import { EventTeaser as EventTeaserType, validateAndCleanupEventTeaser } from "@/lib/zod/events-teaser";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  LanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";
import { useRef} from "react";

import { EventListItem } from "@/components/events/eventList";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestEventsItems } from "@/lib/drupal/get-events";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Divider } from "@/ui/divider";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalNode } from "next-drupal";

interface AllEventsPageProps extends LayoutProps {
  eventTeasers: EventTeaserType[];
  latestEventTeasers: EventTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllEventsPage({
  eventTeasers = [], latestEventTeasers = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <>
    <Meta title={t("all-events")} metatags={[]} />
    <div ref={focusRef} tabIndex={-1} />
    <div>
      <h1 className="text-left md:text-center lg:text-center text-heading-md font-bold">{t("Latest Events")}</h1>
      <div className="border-t border-solid border-secondary-600 mb-6 w-1/2 md:w-1/3 lg:w-1/3 md:mx-auto lg:mx-auto border-2">
      </div>
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {eventTeasers?.map((event) => (
        <li key={event.id}>
          <EventListItem event={event} />
        </li>
        
      ))}
    </ul>
    <Divider className="max-w-4xl" />
    <div className="mt-10">
      <h1 className="text-left md:text-center lg:text-center text-heading-md font-bold">{t("More Events")}</h1>
      <div className="border-t border-secondary-600 mb-6 w-1/2 md:w-1/3 lg:w-1/3 md:mx-auto lg:mx-auto border-2">
      </div>
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {latestEventTeasers?.map((event) => (
        <li key={event.id}>
          <EventListItem event={event} />
        </li>
        
      ))}
    </ul>
  </>
  );
}

export const getStaticProps: GetStaticProps<AllEventsPageProps> = async (
  context,
) => {
  console.log("context", context);

  const pageRoot = "/all-events";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);
  const { events } = await getLatestEventsItems({
    locale: context.locale
  });
  const latestEventsTeasers = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--events", context, {
    params: getNodePageJsonApiParams("node--events").getQueryObject(),
  });


  return {
    props: {
      ...(await getCommonPageProps(context)),
      eventTeasers: events.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      latestEventTeasers: latestEventsTeasers.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      languageLinks,
    },
    revalidate: 60,
  };
};