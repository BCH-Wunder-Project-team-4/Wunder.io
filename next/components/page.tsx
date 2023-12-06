import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";
import { Anchor } from "@/lib/zod/paragraph";
import Link from "next/link";

interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  const anchors = page.field_content_elements.filter(
    (item) => item.type === "paragraph--anchor",
  ) as Anchor[];

  return (
    <>
      {anchors.length > 0 && (
        <div className="flex gap-6 border-b mb-9">
          <span>Jump to: </span>
          <ul className="flex gap-4">
            {anchors?.map((anchor) => (
              <li key={anchor.id} className="text-secondary-foreground">
                <Link
                  href={`#${anchor.field_section_id}`}
                  className="hover:underline"
                >
                  {anchor.field_section_id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    <div className="grid gap-4">
      {page.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
    </>
  );
}
