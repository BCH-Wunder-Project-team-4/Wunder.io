import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";
import { Anchor } from "@/lib/zod/paragraph";
import Chevron from "@/styles/icons/chevron-down.svg";
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
        <div className="mx-2 border-t border-primary-600 dark:border-fog mb-9">
          <div className="pt-4 flex gap-4">
          <span>Skip to: </span>
          <ul className="flex gap-4">
            {anchors?.map((anchor) => (
              <li key={anchor.id}>
                <Link
                  href={`#${anchor.field_section_id}`}
                  className="hover:underline text-primary-600 dark:text-fog flex items-center"
                  >
                    <Chevron className="w-6 h-6 mr-2 text-steelgray dark:text-mischka"/>
                    {anchor.field_section_id}
                </Link>
              </li>
            ))}
          </ul>
          </div>
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
