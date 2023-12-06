import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/zod/events";
import { LatLngTuple } from "leaflet";
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
  const backgroundImageStyle = {
    backgroundImage: `url('${absoluteUrl(event.field_event_image?.uri.url)}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "300px", // Set a specific height for the container
  };
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
      <div style={backgroundImageStyle}>
        <div className="w-full h-full flex text-mischka font-bold items-center justify-center text-md md:text-2xl p-4">
          <div>
            <h1 className="text-mischka">{event.title}</h1>
            {event.field_event_speakers.length > 0 && (
              <p>
                Speakers:{" "}
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
            <p>Date: {formatDate(event.field_event_date, router.locale)}</p>
            <p>{event.field_event_location}</p>
          </div>
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
