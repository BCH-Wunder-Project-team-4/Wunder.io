import Image from "next/image";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Employee } from "@/lib/zod/paragraph";

interface EmployeeTeaserProps {
  paragraph: Employee;
}

export function ParagraphEmployeeItem({ paragraph }: EmployeeTeaserProps) {
  const { t } = useTranslation();
  

  return (
    <div
      className="group relative overflow-hidden bg-white rounded-md shadow-md"
    >
      {paragraph.field_image && (
        <Image
          src={absoluteUrl(paragraph.field_image.field_media_image.uri.url)}
          width={300}
          height={200}
          alt={paragraph.field_image.field_media_image.resourceIdObjMeta.alt}
          className="w-full h-96 object-cover"
        />
      )}
      <div className="absolute h-1/2 w-full bg-black bg-opacity-75 opacity-0 group-hover:opacity-70 group-hover:-translate-y-full transition duration-300">
                <div className=" bg-gradient-to-b from-primary-500 to-primary-200 flex justify-center items-end h-full">
                    <div className="text-white text-center mb-4 font-bold">
                    <p>{paragraph.field_employee_name}</p>
                    <p className=" opacity-30">{paragraph.field_employee_position}</p>
                    <p className="underline">{paragraph.field_employee_email}</p>
                    <p className="underline">{paragraph.field_employee_phone}</p>
                    </div>
                </div>
      
    </div>
    </div>
  );
}
