import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/zod/events";
import CalendarIcon from "@/styles/icons/calendar.svg";
import LocationArrowIcon from "@/styles/icons/location-arrow.svg";
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

  const time = event.field_event_date.substring(11, 16);

  return (
    <div {...props}>
      <div className="relative w-full h-[400px] bg-evergreen rounded-md">
        {event.field_event_image && (
          <Image
            src={absoluteUrl(event.field_event_image?.uri.url)}
            alt={event.field_event_image.resourceIdObjMeta.alt}
            width={event.field_event_image.resourceIdObjMeta.width}
            height={event.field_event_image.resourceIdObjMeta.height}
            priority
            className="w-full h-[400px] object-cover rounded-md"
          />
        )}
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

      <div className="flex flex-col md:flex-row justify-between pt-4 gap-2">
        <div className="w-2/3 flex flex-col justify-evenly">
          <HeadingPage>{event.title}</HeadingPage>
          <div className="my-2">
            <h2 className="text-heading-sm mb-4">Date and time</h2>
            <div className="flex flex-row gap-3">
              <CalendarIcon aria-hidden className="inline-block w-5 h-5" />
              <div>
                <p className="mb-1">
                  {formatDate(event.field_event_date, router.locale)} {time}
                </p>
                <p>Duration: {event.field_event_duration}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 my-2 md:my-0">
          <EventForm eventName={event.title}></EventForm>
        </div>
      </div>

      <div className="py-4">
        <h2 className="text-heading-sm mb-4">Location</h2>
        <div className="flex flex-row gap-3 mb-2">
          <LocationIcon aria-hidden className="inline-block w-5 h-5" />
          <div className="w-full md:w-2/3">
            <p className="mb-1">{event.field_event_location}</p>
            <p>{event.field_event_address}</p>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <p
            onClick={handleTextClick}
            className="bg-primary-600 text-white cursor-pointer px-3 py-2 my-4 inline-block border border-primary-600 rounded-md"
          >
            <LocationArrowIcon
              aria-hidden
              className="inline-block w-5 h-5 -rotate-90 mr-1 mb-1"
            />
            {showMap}
          </p>
          {isDivVisible && <LocationMap markers={markers} />}
        </div>
      </div>
      {event.field_event_description && (
        <div className="w-full md:w-2/3 py-4">
          <h2 className="text-heading-sm mb-4">About this event</h2>
          <p className="md:text-md">{event.field_event_description}</p>
        </div>
      )}
      {event.field_event_speakers.length > 0 && (
        <div className="w-full md:w-2/3 py-4">
          <h2 className="text-heading-sm mb-4">Speakers</h2>
          {event.field_event_speakers.map((speaker, index) => (
            <div key={index} className="py-2">
              <p className="font-bold mb-4 md:text-md">
                {speaker.field_event_speakers_name}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                {speaker.field_event_speakers_image && (
                  <Image
                    src={absoluteUrl(
                      speaker.field_event_speakers_image?.uri.url,
                    )}
                    alt={
                      speaker.field_event_speakers_image.resourceIdObjMeta.alt
                    }
                    width={
                      speaker.field_event_speakers_image.resourceIdObjMeta.width
                    }
                    height={
                      speaker.field_event_speakers_image.resourceIdObjMeta
                        .height
                    }
                    className="w-24 h-auto object-cover rounded-md mb-2"
                  />
                )}
                <p className="md:text-md">
                  {speaker.field_event_speakers_description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
