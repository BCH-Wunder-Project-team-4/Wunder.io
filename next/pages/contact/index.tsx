import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

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


interface ContactPageProps extends LayoutProps {
  
  languageLinks: LanguageLinks;
}

export default function ContactPage({

}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("Contact")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("Become a part of our team")}</HeadingPage>
      <FormattedText html={t("We're on the lookout for dynamic individuals like you to join our team. Explore exciting career prospects and be a part of a collaborative environment that values innovation, growth and creativity. Embrace the opportunity to contribute your unique talents and expertise to our collective success.")} className="text-stone"/>
      <HeadingPage>{t("Open Positions")}</HeadingPage>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      </ul>
      <h1>Hello contact form</h1> 
      <div>
        <ContactForm></ContactForm>
        </div>  
    </>
  );
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async (context) => {
  

  const pageRoot = "/contact";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      
      languageLinks,
    },
    revalidate: 60,
  };
}