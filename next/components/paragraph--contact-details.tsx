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
      <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      <div>
        {paragraph.field_contact_data.map((contact) => (
          <div key={contact.field_name}>
            <MediaImage
              media={contact.field_image}
              alt="contact-image"
              priority
              className="w-48 h-48 rounded-md"
            />
            <h4>{contact.field_name}</h4>
            <p>{contact.field_position}</p>
            <p>{contact.field_email}</p>
            <p>{contact.field_phone}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
