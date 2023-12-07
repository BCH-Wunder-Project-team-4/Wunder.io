import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ArticleTeaserProps {
  article: ArticleTeaserType;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);

  return (
    <Link
      href={article.path.alias}
      className="relative grid grid-rows-1 h-full pb-20 rounded-b-md border-1 dark:border-scapaflow border-primary-600 dark:bg-steelgray bg-mischka  transition-all hover:shadow-md  "
    >
      {article.field_image && (
        <div className="relative">
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={384}
            height={384}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="max-w-full object-cover w-fit-content h-80 "
          />
          <div className="absolute inset-0 bg-primary-400 opacity-50 hover:bg-transparent"></div>
        </div>
      )}
      <div className="text-white w-full bg-primary-600 opacity-80 absolute mt-64 px-5 p-1 rounded-b-md ">
        <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold ">
          {article.title}
        </h3>
        <div className=" line-clamp-2  text-md m-4 ">
          <h4 className="">{author && <>{t("posted-by", { author })} </>}</h4>
          <h4 className="bg-hugs rounded-l-3xl rounded-r-3xl px-3 py-1 max-w-fit ">{date}</h4>
        </div>
      </div>


    </Link>
  );
}