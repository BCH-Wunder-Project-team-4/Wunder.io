import { ExpertTalkTeaser } from "@/lib/zod/expertTalk-teaser";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

interface ExpertTalkListItemProps {
  expertTalk: ExpertTalkTeaser;
}

export function ExpertTalkListItem({ expertTalk }: ExpertTalkListItemProps) {
  const { t } = useTranslation();
  const author = expertTalk;



  return (
    <Link
      href={expertTalk.path.alias}
      className={classNames(
        "flex flex-col justify-between relative w-80 h-72  border-finnishwinter dark:border-scapaflow border-2 p-5 dark:shadow-scapaflow hover:shadow-lg hover:shadow-primary-100",
        expertTalk.sticky
          ? "border-primary-100 shadow-md shadow-primary-100 dark:shadow-fog "
          : "border-finnishwinter dark:bg-steelgray",
      )}
    >
      <div className="flex flex-row items-center">
        {expertTalk.field_image && (
          <Image
            src={absoluteUrl(expertTalk.field_experts_photo.uri.url)}
            width={300}
            height={300}
            className="h-20 w-20 object-cover rounded-full "
            alt={expertTalk.field_experts_photo.resourceIdObjMeta.alt}
          />
        )}
        <div className="flex flex-col py-2 px-5">
          <p className="font-bold text-md">{expertTalk.field_name}</p>
          <p className="italic text-stone dark:text-finnishwinter">{expertTalk.field_expert_job_title}</p>
        </div>
      </div>
      <p className="text-lg font-bold line-clamp-2 text-primary-600 dark:text-fog">{expertTalk.title}</p>
      <p className="line-clamp-3">{expertTalk.field_excerpt}</p>
    </Link>
  );
}
