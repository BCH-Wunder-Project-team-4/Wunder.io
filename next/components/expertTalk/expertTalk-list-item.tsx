import { ExpertTalkTeaser } from "@/lib/zod/expertTalk-teaser";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ExpertTalkListItemProps {
  expertTalk: ExpertTalkTeaser;
}

export function ExpertTalkListItem({ expertTalk }: ExpertTalkListItemProps) {
  const { t } = useTranslation();
  const author = expertTalk.uid?.display_name;
  return (
    <Link
      href={expertTalk.path.alias}
      className={classNames(
        "relative mb-4 grid h-full rounded p-4 rounded-b-md border dark:border-scapaflow border-finnishwinter dark:bg-steelgray bg-mischka  transition-all hover:shadow-md  ",
        expertTalk.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-mischka dark:bg-steelgray",
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold text-primary-600 dark:text-fog">
        {expertTalk.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {expertTalk.field_image && (
          <Image
            src={absoluteUrl(expertTalk.field_image.uri.url)}
            width={500}
            height={300}
            className="w-full sm:w-40"
            alt={expertTalk.field_image.resourceIdObjMeta.alt}
          />
        )}
        <p>{expertTalk.field_excerpt}</p>
      </div>
    </Link>
  );
}
