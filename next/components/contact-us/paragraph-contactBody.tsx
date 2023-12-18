import { useTranslation } from "next-i18next";
import { ContactBody, Employee } from "@/lib/zod/paragraph";
import { FollowUs } from "./followUs";
import { ContactForm } from "@/components/contact-us/contact-form";


export function ParagraphContactBody({ paragraph }: { paragraph: ContactBody }) {
  const { t } = useTranslation();
  
 
  return (
    <div>
        <div>
        <h1 className="py-10 font-bold text-2xl text-primary-500">Send us a message</h1>
        <div className="flex flex-col md:flex-row lg:flex-row">
          <div className="w-1/2 md:w-1/4 lg:w-1/4">
            <h2 className="py-4 font-bold text-lg">We'd love to hear from you</h2>
            <p>{paragraph.field_contact_greeting}</p>
          </div>
          <div className="w-3/4">
            <ContactForm></ContactForm>
        </div>
        </div>
      </div>
      <FollowUs></FollowUs>
    </div>
  );
}
