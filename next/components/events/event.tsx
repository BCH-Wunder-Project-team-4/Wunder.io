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
  console.log(event);

  return (
    <Link
      href={event.path.alias}
      className="relative grid h-full rounded border border-primary-600 bg-transparent  transition-all hover:shadow-md"
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
      <div className="p-4 h-28 flex flex-col justify-between" >

        <h3 className="py-2">{event.field_event_location}</h3>
        <h3 className=" line-clamp-2 text-heading-xs font-bold">
          {event.title}
        </h3>
      </div>


    </Link>
  );
}
