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

interface AllEventsPageProps extends LayoutProps {
  eventTeasers: EventTeaserType[];
  languageLinks: LanguageLinks;
}

export default function AllEventsPage({
  eventTeasers = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Meta title={t("all-events")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("all-events")}</HeadingPage>
      <ul className="mt-4">
        {eventTeasers?.map((event) => (
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


  return {
    props: {
      ...(await getCommonPageProps(context)),
      eventTeasers: events.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      languageLinks,
    },
    revalidate: 60,
  };
};