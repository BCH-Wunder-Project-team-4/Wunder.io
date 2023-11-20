import { OfficeTeaser } from "@/lib/zod/office-teasers";
import { useTranslation } from "next-i18next";

interface OfficeTeaserProps {
  office: OfficeTeaser;
}

export function OfficeItem({ office }: OfficeTeaserProps) {
  const { t } = useTranslation();

  return (
    <div
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {office.title}
      </h3>
      {office.field_office_country && (
        <h1>{office.field_office_country}</h1>
      )}
    </div>
  );
}
