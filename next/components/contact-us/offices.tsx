import { OfficeTeaser as OfficeTeaserType} from "@/lib/zod/office-teasers";
import { useTranslation } from "next-i18next";
import { OfficeItem } from "./officeItem";

interface LatestOfficeProps {
  offices?: OfficeTeaserType[];
}

export function Offices({ offices}: LatestOfficeProps) {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <h2 className="text-heading-sm font-bold md:text-heading-md p-5">
        Meet the Team
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {offices?.map((office) => (
          <li key={office.id}>
            <OfficeItem office={office} />
          </li>
        ))}
      </ul>
    </div>
  );
  
}