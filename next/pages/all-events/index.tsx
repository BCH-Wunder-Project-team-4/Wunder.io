import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { EventTeaser as EventTeaserType, validateAndCleanupEventTeaser } from "@/lib/zod/events-teaser";
import { EventListItem } from "@/components/events/eventList";
import { getLatestEventsItems } from "@/lib/drupal/get-events";
import clsx from "clsx";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { useRouter } from "next/router";

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
      {/* <div>
        <button className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("load-more")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" /></button>
      </div> */}
    </>
  );
}



export const getStaticProps: GetStaticProps<AllEventsPageProps> = async (
  context,
) => {
  console.log("context", context);
  
  const pageRoot = "/contact";
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