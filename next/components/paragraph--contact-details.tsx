import { ContactDetails } from "@/lib/zod/paragraph";
import { HeadingParagraph } from "./heading--paragraph";
import { MediaImage } from "./media--image";

export function ParagraphContactDetails({
  paragraph,
}: {
  paragraph: ContactDetails;
}) {
  if (!paragraph.field_contact_data?.length) return null;

  return (
    <section id="contact_details">
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {paragraph.field_contact_data.map((contact) => (
          <div className="text-left dark:text-mischka" key={contact.field_name}>
            <MediaImage
              media={contact.field_image}
              alt="contact-image"
              priority
              className="min-h-[200px] object-cover"
            />
            <h4 className="font-bold text-md mt-2 mb-1">
              {contact.field_name}
            </h4>
            <p className="text-xs mb-1 uppercase text-scapaflow dark:text-finnishwinter">
              {contact.field_position}
            </p>
            {contact.field_email && (
              <a href={`mailto:${contact.field_email}`} className="underline">
                {contact.field_email}
              </a>
            )}
            {contact.field_phone && (
              <a href={`tel:${contact.field_phone}`} className="underline">
                <p>{contact.field_phone}</p>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}