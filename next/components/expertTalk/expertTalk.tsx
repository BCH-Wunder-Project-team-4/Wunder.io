import { ExpertTalk as ExpertTalkType } from "@/lib/zod/expertTalk";
import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ExpertTalkProps {
  expertTalk: ExpertTalkType;
}

export function ExpertTalk({ expertTalk, ...props }: ExpertTalkProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <article {...props}>
      <HeadingPage>{expertTalk.title}</HeadingPage>

      <div className="flex flex-row items-center my-5">

        {expertTalk.field_image && (

          <Image
            src={absoluteUrl(expertTalk.field_experts_photo.uri.url)}
            width={300}
            height={300}
            alt={expertTalk.field_experts_photo.resourceIdObjMeta.alt}
            className="h-20 w-20 object-cover rounded-full "
          />

        )}
        <div className="flex flex-col py-2 px-5">

          <p className="font-bold text-lg">{expertTalk.field_name}</p>
          <p className="italic text-md text-scapaflow dark:text-finnishwinter">{expertTalk.field_expert_job_title}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-7 mb-12 items-center">

        {expertTalk.field_excerpt && (
          <div className="my-4 text-xl md:w-1/2 pr-10  ">
            <h2 className="first-letter:float-left first-letter:text-heading-xl md:first-letter:text-heading-2xl first-letter:px-4 first-letter:text-primary-600 dark:first-letter:text-fog">{expertTalk.field_excerpt}</h2> </div>
        )}

        {expertTalk.field_image && (
          <figure>
            <Image
              src={absoluteUrl(expertTalk.field_image.uri.url)}
              width={768}
              height={480}
              style={{ width: 768, height: 480 }}
              alt={expertTalk.field_image.resourceIdObjMeta.alt}
              className="object-contain md:w-2/5 "
              priority
            />
            {expertTalk.field_image.resourceIdObjMeta.title && (
              <figcaption className="py-2 text-center text-sm text-steelgray ">
                {expertTalk.field_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        )}
      </div>


      {expertTalk.body?.processed && (
        <FormattedText
          className={expertTalk.body.processed.length > 700 ? "mt-4 text-md/xl text-steelgray dark:text-mischka sm:text-lg columns-2" : "mt-4 text-md/xl text-steelgray dark:text-mischka sm:text-lg"}
          html={expertTalk.body?.processed}
        />
      )}
    </article>
  );
}
