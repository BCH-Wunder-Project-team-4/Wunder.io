import { ExpertTalkTeaser as ExpertTalkTeaserType } from "@/lib/zod/expertTalk-teaser";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { useTranslation } from "next-i18next";

interface ExpertTalkTeaserProps {
  expertTalk: ExpertTalkTeaserType;
}

export function ExpertTalkTeaser({ expertTalk }: ExpertTalkTeaserProps) {
  const { t } = useTranslation();

  return (
    <Link
      href={expertTalk.path.alias}
      className="flex flex-col justify-between relative w-96 h-72 overflow-y-hidden border-finnishwinter dark:border-scapaflow border-2 p-5 dark:shadow-scapaflow  hover:shadow-lg hover:shadow-primary-100"
      data-aos="fade"
    >
      <div className="flex flex-row items-center">

        {expertTalk.field_image && (

          <Image
            src={absoluteUrl(expertTalk.field_experts_photo.uri.url)}
            width={300}
            height={300}
            alt={expertTalk.field_experts_photo.resourceIdObjMeta.alt}
            className="h-20 w-20 object-cover rounded-full "
          />

        )}
        <div className="flex flex-col py-2 px-5">

          <p className="font-bold text-md">{expertTalk.field_name}</p>
          <p className="italic text-scapaflow dark:text-finnishwinter">{expertTalk.field_expert_job_title}</p>
        </div>
      </div>
      <p className="text-lg font-bold line-clamp-2 text-primary-600 dark:text-fog">{expertTalk.title}</p>
      <p className="line-clamp-3">{expertTalk.field_excerpt}</p>

    </Link>
  );
}
