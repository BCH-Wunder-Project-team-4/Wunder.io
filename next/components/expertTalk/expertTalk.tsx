import { ExpertTalk as ExpertTalkType } from "@/lib/zod/expertTalk";
import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
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
      {expertTalk.field_excerpt && (
        <div className="my-4 text-xl">{expertTalk.field_excerpt}</div>
      )}
      <div className="mb-4 text-scapaflow">
        {expertTalk.uid?.display_name && (
          <span>
            {t("posted-by", { author: expertTalk.field_name })} -{" "}
          </span>
        )}

      </div>
      {expertTalk.field_image && (
        <figure>
          <Image
            src={absoluteUrl(expertTalk.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={expertTalk.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          {expertTalk.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-steelgray">
              {expertTalk.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {expertTalk.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-steelgray dark:text-mischka sm:text-lg"
          html={expertTalk.body?.processed}
        />
      )}
    </article>
  );
}
