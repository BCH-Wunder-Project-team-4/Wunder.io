import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalNode } from "next-drupal";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";

import { getCommonPageProps } from "@/lib/get-common-page-props";

import { FormattedText } from "@/components/formatted-text";
import { ContactForm } from "@/components/contact-us/contact-form";
import { LocationMap } from "@/components/contact-us/dynamicMap";
import { ContactBanner } from "@/components/contact-us/contact-banner";
import {EmployeeTeaser as EmployeeTeaserType, validateAndCleanupEmployeeTeaser } from "@/lib/zod/employee-teaser";
import { Team } from "@/components/contact-us/team";
import { FollowUs } from "@/components/contact-us/followUs";
import { Invoice } from "@/components/contact-us/invoicing";
import {OfficeTeaser as OfficeTeaserType, validateAndCleanupOfficeTeaser } from "@/lib/zod/office-teasers";
import { Offices } from "@/components/contact-us/offices";
import { LatLngTuple } from "leaflet";




interface ContactPageProps extends LayoutProps {
  employeeTeasers: EmployeeTeaserType[];
  officeTeasers: OfficeTeaserType[];
  languageLinks: LanguageLinks;
}
type MarkerType = {
  geocode: LatLngTuple,
  popUp: string,
}

export default function ContactPage({officeTeasers = [],
  employeeTeasers = []
}:InferGetStaticPropsType<typeof getStaticProps>){
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);

const markers:MarkerType[] = officeTeasers.map((officeTeaser) => {
  return {
    geocode: [officeTeaser.field_office_geocode_latitude, officeTeaser.field_office_geocode_longitude],
    popUp: officeTeaser.title,
  }})
  
  
  return (
    <>
      <Meta title={t("Contact")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      {/* <ContactBanner></ContactBanner> */}
      <div>
        <h1 className="py-10 font-bold text-2xl text-primary-500">Send us a message</h1>
        <div className="flex">
          <div className="w-1/4">
            <h2 className="py-4 font-bold text-lg">We'd love to hear from you</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-3/4">
        <ContactForm></ContactForm>
        </div>
        </div>
      </div>
      <FollowUs></FollowUs>
      <Team employees={employeeTeasers
      }></Team>
        <div className=" -z-40">
          <LocationMap markers = {markers}></LocationMap>
        </div> 
      <Offices offices={officeTeasers}></Offices>
      <Invoice></Invoice>   
    </>
  );
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async (context) => {
  
  
  const pageRoot = "/contact";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);
  const employeeTeasers = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--employee", context, {
    params: getNodePageJsonApiParams("node--employee").getQueryObject(),
  });
  const officeTeasers = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--office", context, {
    params: getNodePageJsonApiParams("node--office").getQueryObject(),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      officeTeasers: officeTeasers.map((teaser) =>validateAndCleanupOfficeTeaser(teaser)),
      employeeTeasers: employeeTeasers.map((teaser) => validateAndCleanupEmployeeTeaser(teaser)),
      languageLinks,
    },
    revalidate: 60,
  };
}