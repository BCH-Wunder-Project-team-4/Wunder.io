import { OfficeDetails as OfficeDetailsType } from "@/lib/zod/paragraph";

export function ParagraphOfficeDetails({
  paragraph,
}: {
  paragraph: OfficeDetailsType;
}) {
  return (
    <section id="office-details" className="my-4">
      {paragraph.field_heading && (
        <h2
          className={
            "leading-none max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md mb-4"
          }
        >
          {paragraph.field_heading}
        </h2>
      )}
      {paragraph.field_office_info_items && (
        <div>
          {paragraph.field_office_info_items.map((office) => (
            <div key={office.field_name}>
              <h3>{office.field_name}</h3>
              <p>{office.field_address_line_one}</p>
              <p>{office.field_address_line_two}</p>
              <p>{office.field_office_info_country}</p>
              {office.field_email && <p>{office.field_email}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
