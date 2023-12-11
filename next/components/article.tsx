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
      {article.field_image && (
        <div className="flex justify-end">
          <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-10">
            {article.field_excerpt && (
              <div className="my-4 text-xl w-full md:w-2/4">
                {article.field_excerpt}
              </div>
            )}
            <figure className="w-full md:w-2/4">
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
        </div>
      )}
      {article.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
