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
      className="flex justify-center items-center "
    >
      <div className=" ml-1 mr-1 flex flex-col justify-center items-center w-96  relative">

        {article.field_image && (

          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={384}
            height={384}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="relative object-cover w-43 h-64"
          />

        )}
        <div className=" flex flex-col justify-between text-info w-11/12 -mt-14 h-72 z-10 p-5 bg-[url('../public/notebookPaper.webp')] bg-cover shadow-md ">
          <div className="w-10 h-10 self-center -mt-8 mb-1 bg-cover  bg-[url('../public/pin.webp')] "></div>
          <h3 className=" line-clamp-2 text-heading-xs font-bold text-primary-600 ">
            {article.title}
          </h3>
          <hr className="h-px my-2 bg-graysuit border-0 dark:bg-gray-700"></hr>
          <div className="h-24">
            <p className="line-clamp-4 text-scapaflow italic">{article.field_excerpt}</p>
          </div>

          <hr className="h-px my-2 bg-graysuit border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-row justify-between text-xs">
            <p >{author && <>{t("posted-by", { author })} </>}</p>
            <p >{date}</p>
          </div>

        </div>
      </div>



    </Link >
  );
}