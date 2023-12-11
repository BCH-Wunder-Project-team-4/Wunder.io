import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import ImageIcon from "@/styles/icons/image.svg";
import clsx from "clsx";

import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate, formatDateDay, formatDateMonth } from "@/lib/utils";
import { EventTeaser } from "@/lib/zod/events-teaser";

interface EventListItemProps {
  event: EventTeaser;
}

export function EventListItem({ event }: EventListItemProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const month = formatDateMonth(event.created, router.locale);
  const day = formatDateDay(event.created, router.locale);
  return (
    <div
      
      className={classNames(
        "bg-primary border flex flex-col relative group",
        event.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-white",
      )}
    >
      <div className=" overflow-hidden">
        {event.field_event_image && (
          <Image
            src={absoluteUrl(event.field_event_image.uri.url)}
            width={600}
            height={440}
            className="transition-transform duration-300 ease-in-out group-hover:scale-125"
            alt={event.field_event_image.resourceIdObjMeta.alt}
          />
        )}
        <div className="absolute top-2 left-2">
        <div className=" bg-secondary-600 py-3 px-5 rounded-lg font-bold">
          <p className="text-center">{day}</p>
          <p className="text-center">{month.substring(0,3)}</p>
        </div>
        </div>
      </div>
      <div className=" bg-white h-52 flex flex-col justify-evenly items-baseline px-4">
        <div className="flex justify-center items-center">
          <div>
         <p> <ImageIcon className="block h-4 w-4 text-primary-500 mr-2" /></p>
          </div>
          <div>
            <p>{event.uid?.display_name}</p>
          </div>
        </div>
      <h3 className="text-2xl font-bold">
        {event.title}
      </h3>
      <div className="">
      <Link
            href={event.path.alias}
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("Read More")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
      </div>
      </div>
    </div>
  );
}
