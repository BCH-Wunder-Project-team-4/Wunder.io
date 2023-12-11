import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Article as ArticleType } from "@/lib/zod/article";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Paragraph } from "./paragraph";

interface ArticleProps {
  article: ArticleType;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="grid gap-4">
      <HeadingPage>{article.title}</HeadingPage>
      <div className="mb-4 text-scapaflow dark:text-graysuit">
        {article.uid?.display_name && (
          <span>
            {t("posted-by", { author: article.uid?.display_name })} -{" "}
          </span>
        )}
        <span>{formatDate(article.created, router.locale)}</span>
        {/* Author picture can be added here */}
      </div>
      {!article.field_image && article.field_excerpt && (
        <div className="mb-4 text-xl">{article.field_excerpt}</div>
      )}
      {!article.field_excerpt && article.field_image && (
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
      {article.field_image && article.field_excerpt && (
        <div className="grid grid-rows-1 md:grid-cols-6 gap-4">
          {article.field_excerpt && (
            <div className="mb-4 md:pr-6 text-xl md:col-start-2 md:col-span-3">
              {article.field_excerpt}
            </div>
          )}
          <figure className="md:col-start-5 md:col-span-2">
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
      {article.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
