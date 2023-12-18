import { Article as ArticleType } from "@/lib/zod/article";
import { HeadingPage } from "@/components/heading--page";
import Image from "next/image";
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
    <div className="grid gap-4">
      <HeadingPage>{article.title}</HeadingPage>
      <div className="mb-4 text-scapaflow dark:text-graysuit justify-start items-center">
        {article.uid?.display_name && (
          <>
            <p>
              {article.uid?.field_profile_picture && (
                <Image
                  src={absoluteUrl(article.uid?.field_profile_picture?.uri.url)}
                  width={36}
                  height={36}
                  className="rounded-full inline-block mr-4"
                  alt={
                    article.uid?.field_profile_picture?.resourceIdObjMeta.alt
                  }
                />
              )}
              <span>
                {t("posted-by", { author: article.uid?.display_name })} -{" "}
              </span>
              <span>{formatDate(article.created, router.locale)}</span>
            </p>
          </>
        )}
      </div>
      {!article.field_image && article.field_excerpt && (
        <div className="mb-4 text-xl">{article.field_excerpt}</div>
      )}
      {!article.field_excerpt && article.field_image && (
        <figure className="mb-4">
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
      {article.field_image && article.field_excerpt && (
        <div className="grid grid-rows-1 md:grid-cols-7 gap-2 mb-8 md:mb-12">
          {article.field_excerpt && (
            <div className="mb-4 text-lg lg:text-xl md:col-start-1 md:col-span-3">
              {article.field_excerpt}
            </div>
          )}
          <figure className="md:col-start-5 md:col-span-3">
            <Image
              src={absoluteUrl(article.field_image.uri.url)}
              width={500}
              height={300}
              style={{ width: 500, height: 300 }}
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
        </div>
      )}
      <div className="grid grid-rows-1 md:grid-cols-6 gap-2">
        <div className="md:col-start-2 md:col-span-4">
          {article.field_content_elements?.map((paragraph) => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))}
        </div>
      </div>
    </div>
  );
}
