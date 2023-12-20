import { ContactUs, validateAndCleanupContactUs } from "@/lib/zod/contact_us";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import { DrupalNode } from "next-drupal";
import { Invoice } from "@/components/contact-us/invoicing";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import {
  createLanguageLinksForNextOnlyPage
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props"
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { useRef } from "react";
import { useTranslation } from "next-i18next";

interface ContactPageProps extends LayoutProps {
  contact_us: ContactUs;
}

export default function ContactPage({ contact_us
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Meta title={t("Contact")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <div className="grid gap-4">
        {contact_us?.field_contact_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div>
      <div>
        {contact_us?.field_contact_invoicing?.map((paragraph) => (
          <Invoice paragraph={paragraph}></Invoice>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async (context) => {
  const pageRoot = "/contact";
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);
  const contact_us = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--contact_us",
      context,
      {
        params: getNodePageJsonApiParams("node--contact_us").getQueryObject(),
      },
    )
  ).at(0);
  const employeeTeasers = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--employee", context, {
    params: getNodePageJsonApiParams("node--employee").getQueryObject(),
  });
  const officeTeasers = await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--office", context, {
    params: getNodePageJsonApiParams("node--office").getQueryObject(),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      contact_us: contact_us ? validateAndCleanupContactUs(contact_us) : null,
      languageLinks,
    },
    revalidate: 60,
  };
}