import { Paragraph } from "@/components/paragraph";
import type { Case } from "@/lib/zod/case";

interface CaseProps {
  caseNode: Case;
}

export function Case({ caseNode }: CaseProps) {
  return (
    <div className="grid gap-4">
      {caseNode.field_content_elements?.map((paragraph) => (
        <div data-aos="fade">
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        </div>
      ))}
    </div>
  );
}
