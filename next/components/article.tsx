import { Article as ArticleType } from "@/lib/zod/article";
import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import Image from "next/image";
import { MediaImage } from "./media--image";
import { Paragraph } from "./paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ArticleProps {
  article: ArticleType;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    // <div className="grid gap-4">
    //   {article.field_content_elements?.map((paragraph) => (
    //     <Paragraph key={paragraph.id} paragraph={paragraph} />
    //   ))}
    // </div>
    <div className="grid gap-4" {...props}>
      <HeadingPage>{article.title}</HeadingPage>
      <div className="mb-4 text-scapaflow flex justify-start items-center">
        {article.uid?.display_name && (
          <div className="flex justify-center items-center">
            <p>
            <span>
            {t("posted-by", { author: article.uid?.display_name })}
          </span>
            </p>
            <div className="mx-2">
              <Image
                src={absoluteUrl(article.uid?.field_profile_picture?.uri.url)}
                width={20}
                height={20}
                className="rounded-full"
                alt={article.uid?.field_profile_picture?.resourceIdObjMeta.alt}
              />
            </div>
          </div>
          
        )}
        <span>{formatDate(article.created, router.locale)}</span>
      </div>
      {article.field_image && (
        <figure>
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          {article.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {article.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {article.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
