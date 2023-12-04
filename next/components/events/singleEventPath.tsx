import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/zod/events";
import clsx from "clsx";
import { buttonVariants } from "@/ui/button";
import { LocationMap } from "../contact-us/dynamicMap";
import { LatLngTuple } from "leaflet";
import { EventForm } from "./event-form";
import { useState } from "react";


interface EventProps {
  event: Event;
}
type MarkerType = {
    geocode: LatLngTuple,
    popUp: string,
  }

export function SingleEventPath({ event, ...props }: EventProps) {
  
  const { t } = useTranslation();
  const router = useRouter();
  const markers: MarkerType[]  = [

    {
        geocode: [event.field_event_geocode_latitude, event.field_event_geocode_longitude],
        popUp: event.title,
    },]
  const backgroundImageStyle = {
    backgroundImage: `url('${absoluteUrl(event.field_event_image?.uri.url)}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '300px', // Set a specific height for the container
  };
    const [isDivVisible, setDivVisibility] = useState(false);
    const [showMap, setShowMap] = useState('Show Map');
  
    const handleTextClick = () => {
      setDivVisibility(!isDivVisible);
        setShowMap(showMap === 'Show Map' ? 'Hide Map' : 'Show Map');
    };
    console.log(event.field_event_speakers);
  return (
    <div {...props}>
        <div style={backgroundImageStyle}>
            <div className="w-full h-full flex text-white font-bold items-center justify-center text-2xl backdrop-blur">
            <div>
            <h1>{event.title}</h1>
            {<p>Speakers: {event.field_event_speakers.map((speaker) => speaker.field_event_speakers_name).join(' and ')}</p> 
            }
            <p>Date: {event.field_event_date.slice(0, 10)}</p>
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
        <h1>Date and time</h1>
        <p>{event.field_event_date.slice(0, 10)} {event.field_event_date.slice(11, 16)}</p>
      </div>
      </div>
      <div className="w-2/4">
        <EventForm eventName = {event.title}></EventForm>
        </div>
        
      </div>
        <div className="py-4">
        <h1>Location</h1>
        <p>{event.field_event_location}</p>
        <p>{event.field_event_address}</p>
        <div>
            <p onClick={handleTextClick} style={{ cursor: 'pointer', color: 'blue' }}>{showMap}</p>
            {isDivVisible && <LocationMap markers={markers} />}
        </div>
      </div>
      <div>
        <h1>About this event</h1>
        <p className="pb-4">Duration: {event.field_event_duration}</p>
        <p>{event.field_event_description}</p>
      </div>
      <div className="py-4">
        <h1>Speakers: </h1>
        {event.field_event_speakers.map((speaker) => 
        <p className="py-2">{speaker.field_event_speakers_description}</p>)
        }
      </div>
    </div>
  );
}
