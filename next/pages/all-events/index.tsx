import { EventTeaser as EventTeaserType, validateAndCleanupEventTeaser } from "@/lib/zod/events-teaser";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  LanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";

import { Divider } from "@/ui/divider";
import { DrupalNode } from "next-drupal";
import { EventListItem } from "@/components/events/eventList";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getLatestEventsItems } from "@/lib/drupal/get-events";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { useRef } from "react";
import { useTranslation } from "next-i18next";

interface AllEventsPageProps extends LayoutProps {
  eventTeasers: EventTeaserType[];
  latestEventTeasers: EventTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllEventsPage({
  eventTeasers = [], latestEventTeasers = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  const focusRef = useRef<HTMLDivElement>(null);

  let sortedEvents = eventTeasers.filter((event) => event.field_event_date >= new Date().toISOString())
  console.log(sortedEvents);

  sortedEvents = sortedEvents.sort(function (a, b) {
    if (a.field_event_date > b.field_event_date) {
      return 1;
    }
    if (a.field_event_date < b.field_event_date) {
      return -1;
    }
    return 0;
  });



  return (
    <>
      <Meta title={t("all-events")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <div>
        <h1 className="text-left md:text-center lg:text-center text-heading-md font-bold">{t("Upcoming events")}</h1>
        <div className="border-t border-solid border-rose mb-6 w-1/2 md:w-1/3 lg:w-1/3 md:mx-auto lg:mx-auto border-2">
        </div>
      </div>
      <ul className="flex flex-row flex-wrap gap-16 mx-auto ">
        {sortedEvents?.map((event) => (
          <li key={event.id}>
            <EventListItem event={event} />
          </li>

        ))}
      </ul>
      <Divider className="max-w-4xl" />
      <div className="mt-10">
        <h1 className="text-left md:text-center lg:text-center text-heading-md font-bold">{t("All events")}</h1>
        <div className="border-t border-rose mb-6 w-1/2 md:w-1/3 lg:w-1/3 md:mx-auto lg:mx-auto border-2">
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