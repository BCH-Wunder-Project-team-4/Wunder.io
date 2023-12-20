import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { EventTeaserComponent } from "./event";
import { EventTeaser as EventTeaserType } from "@/lib/zod/events-teaser";
import Link from "next/link";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";
import { useTranslation } from "next-i18next";

interface LatestEventsProps {
  events?: EventTeaserType[];
  heading: string;
}

export function Events({ events, heading }: LatestEventsProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md" >
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {events?.map((event) => (
          <li key={event.id}>
            <EventTeaserComponent event={event} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!events?.length && <p className="py-4">{t("no-content-found")}</p>}
        {events?.length && (
          <Link
            href="/all-events"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("all-events")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
