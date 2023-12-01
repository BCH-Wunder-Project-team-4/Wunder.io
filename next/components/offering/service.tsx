import { Paragraph } from "@/components/paragraph";
import type { Service } from "@/lib/zod/service";

interface ServiceProps {
  service: Service;
}

export function Service({ service }: ServiceProps) {
  return (
    <div className="grid gap-4">
      {service.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
