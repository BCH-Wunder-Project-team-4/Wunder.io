import { useTranslation } from "next-i18next";
import {Offices } from "@/lib/zod/paragraph";
import { LocationMap } from "./dynamicMap";
import { LatLngTuple } from "leaflet";
import { Paragraph } from "../paragraph";

type MarkerType = {
    geocode: LatLngTuple,
    popUp: string,
  }
export function ParagraphOffices({ paragraph }: { paragraph: Offices }) {
  const { t } = useTranslation();
  const markers:MarkerType[] = paragraph.field_offices_content_elements?.map((office) => {
    return {
      geocode: [office.field_office_geocode_latitude, office.field_office_geocode_longitude],
      popUp: office.field_office_city,
    }})
  return (
    <div className="">
        <div className=" -z-40">
          <LocationMap markers = {markers}></LocationMap>
        </div> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
      {paragraph.field_offices_content_elements.map((paragraph)=><Paragraph key={paragraph.id} paragraph={paragraph}></Paragraph>)}
      </div>
    </div>
  );
}

