import { Anchor as AnchorType } from "@/lib/zod/paragraph";

export function ParagraphAnchor({
  paragraph,
}: {
  paragraph: AnchorType;
}) {
  return <div id={paragraph.field_section_id} className="scroll-m-20" ></div>;
}