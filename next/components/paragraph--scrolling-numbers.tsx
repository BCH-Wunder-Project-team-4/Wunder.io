import { ScrollingNumbers } from "@/lib/zod/paragraph";

export function ParagraphScrollingNumbers({
  paragraph,
}: {
  paragraph: ScrollingNumbers;
}) {
  if (!paragraph.field_scrolling_numbers?.length) return null;
  console.log(paragraph);

  return (
    <div className="flex flex-col items-center">
      <h2>Scrolling Numbers</h2>
      <div className="flex flex-row">
        {paragraph.field_scrolling_numbers.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="font-bold text-5xl">{item.field_number}</div>
            <div className="text-2xl">{item.field_number_suffix}</div>
            <div className="text-2xl">{item.field_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
