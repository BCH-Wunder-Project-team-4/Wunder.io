import { Paragraph } from "@/components/paragraph";
import type { Case } from "@/lib/zod/case";
import { HeadingPage } from "@/components/heading--page";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";

interface CaseProps {
  caseNode: Case;
}

export function Case({ caseNode }: CaseProps) {
  return (
    <div className="grid gap-4">
      <HeadingPage >{caseNode.title}</HeadingPage>

      {!caseNode.field_image && caseNode.field_excerpt && (
        <div className="mb-4 text-xl" data-aos="fade">{caseNode.field_excerpt}</div>
      )}

      {!caseNode.field_excerpt && caseNode.field_image && (
        <figure className="mb-4" data-aos="fade">
          <Image
            src={absoluteUrl(caseNode.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={caseNode.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority

          />
          {caseNode.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {caseNode.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {caseNode.field_image && caseNode.field_excerpt && (
        <div className="grid grid-rows-1 md:grid-cols-7 gap-2 mb-8 md:mb-12 items-center" data-aos="fade">
          {caseNode.field_excerpt && (
            <div className="mb-4 text-lg lg:text-xl md:col-start-1 md:col-span-3" data-aos="fade">
              {caseNode.field_excerpt}
            </div>
          )}
          <figure className="md:col-start-5 md:col-span-3">
            <Image
              src={absoluteUrl(caseNode.field_image.uri.url)}
              width={600}
              height={375}
              style={{ width: 600, height: 375 }}
              alt={caseNode.field_image.resourceIdObjMeta.alt}
              className="object-cover"
              priority
            />
            {caseNode.field_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-center text-sm text-scapaflow">
                {caseNode.field_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        </div>
      )}
      {caseNode.field_content_elements?.map((paragraph) => (
        <div data-aos="fade" key={paragraph.id}>
          <Paragraph paragraph={paragraph} />
        </div>
      ))}
    </div>
  );
}
