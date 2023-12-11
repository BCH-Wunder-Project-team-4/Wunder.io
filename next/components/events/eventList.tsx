import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { EventTeaser } from "@/lib/zod/events-teaser";

interface EventListItemProps {
  event: EventTeaser;
}

export function EventListItem({ event }: EventListItemProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = formatDate(event.created, router.locale);
  return (
    <Link
      href={event.path.alias}
      className={classNames(
        "relative mb-4 grid h-full rounded p-4 rounded-b-md border dark:border-scapaflow border-finnishwinter dark:bg-steelgray bg-mischka  transition-all hover:shadow-md  ",
        event.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-mischka dark:bg-steelgray",
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold text-primary-600 dark:text-fog">
        {event.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow dark:text-graysuit">
        {date}
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {event.field_event_image && (
          <Image
            src={absoluteUrl(event.field_event_image.uri.url)}
            width={500}
            height={300}
            className="w-full sm:w-40"
            alt={event.field_event_image.resourceIdObjMeta.alt}
          />
        )}
        <p>{event.field_event_description}</p>
      </div>
    </Link>
  );
}
