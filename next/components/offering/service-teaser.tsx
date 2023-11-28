import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ServiceTeaser } from "@/lib/zod/service-teaser";
import { FormattedText } from "../formatted-text";

interface ServiceTeaserProps {
  service: ServiceTeaser;
}

export function ServiceTeaser({ service }: ServiceTeaserProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Link
      href={service.path.alias}
      className="relative grid h-full dark:bg-steelgray bg-mischka p-4"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold underline">
        {service.title}
      </h3>
      <FormattedText className="text-stone" html={service.field_excerpt}/>
    </Link>
  );
}
