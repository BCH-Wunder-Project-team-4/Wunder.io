import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/zod/events";
import LocationIcon from "@/styles/icons/location.svg";
import PresenterIcon from "@/styles/icons/presenter.svg";
import { LatLngTuple } from "leaflet";
import Image from "next/image";
import { useState } from "react";
import { LocationMap } from "../contact-us/dynamicMap";
import { EventForm } from "./event-form";

interface EventProps {
  event: Event;
}
type MarkerType = {
  geocode: LatLngTuple;
  popUp: string;
};

export function SingleEventPath({ event, ...props }: EventProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const markers: MarkerType[] = [
    {
      geocode: [
        event.field_event_geocode_latitude,
        event.field_event_geocode_longitude,
      ],
      popUp: event.title,
    },
  ];

  const [isDivVisible, setDivVisibility] = useState(false);
  const [showMap, setShowMap] = useState("Show Map");

  const handleTextClick = () => {
    setDivVisibility(!isDivVisible);
    setShowMap(showMap === "Show Map" ? "Hide Map" : "Show Map");
  };

  //console.log(event.field_event_speakers);
  console.log(event);

  return (
    <div {...props}>
      <div className="relative w-full h-[400px] bg-evergreen rounded-md">
        <Image
          src={absoluteUrl(event.field_event_image?.uri.url)}
          alt={event.field_event_image.resourceIdObjMeta.alt}
          width={event.field_event_image.resourceIdObjMeta.width}
          height={event.field_event_image.resourceIdObjMeta.height}
          className="w-full h-[300px] object-cover rounded-md"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-primary-600 opacity-70 rounded-b-md">
          <h3 className="text-white font-bold text-heading-sm md:text-heading-md">
            {event.title}
          </h3>
          <p className="text-lg md:text-xl font-bold pb-2">
            {formatDate(event.field_event_date, router.locale)}
          </p>
          <p className="text-md md:text-lg">
            {
              <LocationIcon
                aria-hidden
                className="inline-block w-5 h-5 md:w-6 md:h-6 mb-1 mr-1"
              />
            }
            {event.field_event_location}
          </p>
          {event.field_event_speakers.length > 0 && (
            <p className="text-md md:text-lg">
              <PresenterIcon
                aria-hidden
                className="inline-block w-5 h-5 md:w-6 md:h-6 mb-1 mr-1"
              />
              {event.field_event_speakers
                .map((speaker, index, array) =>
                  index < array.length - 2
                    ? speaker.field_event_speakers_name + ", "
                    : index === array.length - 2
                    ? speaker.field_event_speakers_name + " and "
                    : speaker.field_event_speakers_name,
                )
                .join("")}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <div className="w-1/2">
          <HeadingPage>{event.title}</HeadingPage>
          <div className="mb-4 text-scapaflow">
            <span>published on - </span>
            <span>{formatDate(event.created, router.locale)}</span>
          </div>
          <div>
            <h2>Date and time</h2>
            <p>{formatDate(event.field_event_date, router.locale)}</p>
          </div>
        </div>
        <div className="w-2/4">
          <EventForm eventName={event.title}></EventForm>
        </div>
      </div>
      <div className="py-4">
        <h2>Location</h2>
        <p>{event.field_event_location}</p>
        <p>{event.field_event_address}</p>
        <div>
          <p
            onClick={handleTextClick}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {showMap}
          </p>
          {isDivVisible && <LocationMap markers={markers} />}
        </div>
      </div>
      <div>
        <h2>About this event</h2>
        <p className="pb-4">Duration: {event.field_event_duration}</p>
        <p>{event.field_event_description}</p>
      </div>
      {event.field_event_speakers.length > 0 && (
        <div className="py-4">
          <h2>Speakers:</h2>
          {event.field_event_speakers.map((speaker, index) => (
            <p key={index} className="py-2">
              {speaker.field_event_speakers_description}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
