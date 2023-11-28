import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { Offering, validateAndCleanupOffering } from "@/lib/zod/offering";


interface IndexPageProps extends LayoutProps {
  offering: Offering | null;
}

export default function IndexPage({
  offering,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  

  return (
    <>
      <Meta title={offering?.title} metatags={offering?.metatag} />
      <div className="grid gap-4">
        {offering?.field_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context,
) => {
  const offering = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--offering",
      context,
      {
        params: getNodePageJsonApiParams("node--offering").getQueryObject(),
      },
    )
  ).at(0);


  return {
    props: {
      ...(await getCommonPageProps(context)),
      offering: offering ? validateAndCleanupOffering(offering) : null,
    revalidate: 60,
  }
}
}
