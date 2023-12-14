import { formatDateDay, formatDateMonth, formatDateYear } from "@/lib/utils";

import ClockIcon from "@/styles/icons/clock.svg";
import { EventTeaser } from "@/lib/zod/events-teaser";
import Icon from "@/styles/icons/home.svg";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface EventListItemProps {
  event: EventTeaser;
}

export function EventListItem({ event }: EventListItemProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const month: string = formatDateMonth(event.field_event_date, router.locale);
  const day = formatDateDay(event.field_event_date, router.locale);
  const year = formatDateYear(event.field_event_date, router.locale);
  console.log("date", month, day, year);

  return (

    <Link
      href={event.path.alias}
      className={classNames(
        "flex flex-col justify-between relative w-80 h-80  border-finnishwinter dark:border-scapaflow border-2  dark:shadow-fog hover:shadow-lg hover:shadow-primary-100",
        event.sticky
          ? "border-primary-100 shadow-md shadow-primary-100 dark:shadow-fog "
          : "border-finnishwinter dark:bg-steelgray",
      )}
    >
      <div className="flex flex-col">
        {event.field_event_image && (
          <Image
            src={absoluteUrl(event.field_event_image.uri.url)}
            width={300}
            height={300}
            className="relative object-cover w-80 h-56"
            alt={event.field_event_image.resourceIdObjMeta.alt}
          />
        )}
        <div className=" flex flex-row justify-around items-center w-32 px-2 h-8 -mt-10 ml-2 z-20 bg-rose dark:text-steelgray  font-bold rounded">
          <p className="text-center">{day}</p>
          <p className="text-center">{month.substring(0, 3)}</p>
          <p className="text-center">{year}</p>
        </div>
      </div>
      <div className="h-32 flex flex-col justify-evenly items-baseline p-4">
        <div className="flex flex-row">
          <p className="w-5 h-5"><Icon /></p>
          <p className="pl-3">{event.field_event_location}</p>
        </div>
        <h3 className="text-lg text-primary-600 line-clamp-1 font-bold h-8 py-2">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}