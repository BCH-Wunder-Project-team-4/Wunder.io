import { EventTeaser } from "@/lib/zod/events-teaser";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface EventTeaserProps {
  event: EventTeaser;
}

export function EventTeaserComponent({ event }: EventTeaserProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = formatDate(event.field_event_date, router.locale);

  return (
    <Link
      href={event.path.alias}
      className="flex flex-col justify-between relative h-76 overflow-y-hidden border-finnishwinter dark:border-scapaflow border-2 p-5  hover:shadow-primary-600 hover:shadow-lg dark:shadow-stone"
    >
      {event.field_event_image && (
        <div className="relative">
          <Image
            src={absoluteUrl(event.field_event_image.uri.url)}
            width={384}
            height={240}
            alt={event.field_event_image.resourceIdObjMeta.alt}
            className="object-cover max-h-56"
          />
          <div className="absolute bottom-2 bg-martinique max-w-fit p-1 ml-4 line-clamp-2 text-md text-mellow">
            <h4>{date}</h4>
          </div>
        </div>
      )}
      <div className="h-20 flex flex-col justify-between">
        <h3 className="py-2">{event.field_event_location}</h3>
        <h3 className=" text-lg font-bold text-primary-600 dark:text-fog tracking-tight line-clamp-1">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}
