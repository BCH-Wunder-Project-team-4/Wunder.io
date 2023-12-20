import { FormattedText } from "../formatted-text";
import Link from "next/link";
import { ServiceTeaser as ServiceTeaserType } from "@/lib/zod/service-teaser";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ServiceTeaserProps {
  service: ServiceTeaserType;
}

export function ServiceTeaser({ service }: ServiceTeaserProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Link
      href={service.path.alias}
      className="relative grid h-full dark:bg-steelgray bg-mischka p-4 transition-transform duration-200 ease-in-out hover:scale-105"
      data-aos="fade">
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold  text-primary-600 dark:text-fog underline">
        {service.title}
      </h3>
      <FormattedText className="text-steelgray dark:text-graysuit" html={service.field_excerpt} />
    </Link>
  );
}
