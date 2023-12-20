import { Office } from "@/lib/zod/paragraph";
import { useTranslation } from "next-i18next";
import WunderCarrotIcon from "@/styles/icons/wunder-carrot.svg";

interface OfficeTeaserProps {
  paragraph: Office;
}

export function ParagraphOfficeItem({ paragraph }: OfficeTeaserProps) {
  const { t } = useTranslation();
  

  return (
    <div
      className="flex flex-col items-start justify-start"
    >
        <div>
        <h1 className="font-bold pb-2">{paragraph.field_office_city}</h1>
        </div>
      <div className="pb-2">
        <p>{paragraph.field_office_address_one}</p>
        <p>{paragraph.field_office_address_two}</p>
        <p>{paragraph.field_office_country}</p>
        <p className="underline text-primary-400">{paragraph.field_office_email}</p>
      
      </div>
    </div>
  );
}
