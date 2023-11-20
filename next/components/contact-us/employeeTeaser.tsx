import Image from "next/image";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { EmployeeTeaser } from "@/lib/zod/employee-teaser";

interface EmployeeTeaserProps {
  employee: EmployeeTeaser;
}

export function EmployeeTeaserComponent({ employee }: EmployeeTeaserProps) {
  const { t } = useTranslation();

  return (
    <div
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {employee.title}
      </h3>
      {employee.field_employee_image && (
        <Image
          src={absoluteUrl(employee.field_employee_image.uri.url)}
          width={384}
          height={240}
          alt={employee.field_employee_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
    </div>
  );
}
