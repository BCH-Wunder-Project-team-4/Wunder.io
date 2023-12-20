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
          data-aos="fade"
        >
          {paragraph.field_heading}
        </h2>
      )}
      {paragraph.field_text && (
        <p className="mb-8 max-w-2xl text-left text-md/xl mt-4 text-steelgray dark:text-mischka" data-aos="fade">
          {paragraph.field_text}
        </p>
      )}
      {paragraph.field_office_info_items && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {paragraph.field_office_info_items.map((office) => (
            <div
              key={office.field_name}
              className="text-left text-steelgray dark:text-mischka mb-4"
              data-aos="fade"
            >
              <h3 className="font-bold text-lg mb-2">{office.field_name}</h3>
              <p className="text-md">{office.field_address_line_one}</p>
              <p className="text-md">{office.field_address_line_two}</p>
              <p className="text-md">{office.field_office_info_country}</p>
              {office.field_email && (
                <a
                  href={`mailto:${office.field_email}`}
                  className="underline text-md text-primary-600 dark:text-fog"
                >
                  {office.field_email}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
