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




interface ContactPageProps extends LayoutProps {
  employeeTeasers: EmployeeTeaserType[];
  languageLinks: LanguageLinks;
}

export default function ContactPage({
  employeeTeasers = []
}:InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  
  console.log(employeeTeasers);
  
  return (
    <>
      <Meta title={t("Contact")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <ContactBanner></ContactBanner>
      <div>
        <h1 className="py-10 font-bold text-2xl">Send us a message</h1>
        <div className="flex">
          <div className="w-1/2">
            <h2 className="py-4 font-bold text-lg">We love to hear from you</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus massa non neque vulputate lacinia. Mauris dapibus dolor et orci porttitor, sed volutpat nunc rutrum.</p>
          </div>
          <div>
        <ContactForm></ContactForm>
        </div>
        </div>
      </div>
      <FollowUs></FollowUs>
      <Team employees={employeeTeasers}></Team>
        <div className=" -z-40">
          <LocationMap></LocationMap>
        </div> 
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

  return {
    props: {
      ...(await getCommonPageProps(context)),
      employeeTeasers: employeeTeasers.map((teaser) => validateAndCleanupEmployeeTeaser(teaser)),
      languageLinks,
    },
    revalidate: 60,
  };
}