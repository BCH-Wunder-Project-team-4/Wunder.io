import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { EventTeaser } from "@/lib/zod/events-teaser";

interface EventTeaserProps {
  event: EventTeaser;
}

export function EventTeaserComponent({ event }: EventTeaserProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = formatDate(event.created, router.locale);
  return (
    <Link
      href={event.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {event.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {date}
      </div>
      {event.field_event_image && (
        <Image
          src={absoluteUrl(event.field_event_image.uri.url)}
          width={384}
          height={240}
          alt={event.field_event_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
    </Link>
  );
}
