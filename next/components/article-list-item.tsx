import { ArticleTeaser } from "@/lib/zod/article-teaser";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import classNames from "classnames";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ArticleListItemProps {
  article: ArticleTeaser;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  return (
    <Link
      href={article.path.alias}
      className={classNames(
        "flex flex-col justify-between h-96 w-80 border-finnishwinter dark:border-scapaflow border-2 p-5 hover:shadow-primary-100 hover:shadow-md dark:shadow-stone",
        article.sticky
          ? "border-primary-100 shadow-md shadow-primary-100 dark:shadow-fog "
          : "border-finnishwinte dark:bg-steelgray",
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold text-primary-600 dark:text-fog">{article.title}</h3>
      {article.field_image && (
        <Image
          src={absoluteUrl(article.field_image.uri.url)}
          width={300}
          height={300}
          className="w-full h-40 object-cover"
          alt={article.field_image.resourceIdObjMeta.alt}
        />
      )}

      <p className=" line-clamp-4 h-24">{article.field_excerpt}</p>
      <div className="flex flex-row justify-between text-xs text-scapaflow">
        {author && <p>{t("posted-by", { author })} - </p>}
        <div className=" line-clamp-2 text-xs text-scapaflow dark:text-graysuit">{date}</div>
      </div>
    </Link>
  );
}