import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { DrupalNode } from "next-drupal";

interface CaseTeaserProps {
  caseItem: DrupalNode;
}

export function CaseTeaser({ caseItem }: CaseTeaserProps) {
  return (
    <Link href={caseItem.path.alias}>
      <div className={classNames("relative grid rounded bg-white transition-all hover:shadow-md")}>
        {caseItem.field_image && (
        <div className="aspect-w-4 aspect-h-3 rounded-sm overflow-hidden">
          <Image
            src={absoluteUrl(caseItem.field_image.uri.url)}
            width={384}
            height={240}
            alt={caseItem.field_image.resourceIdObjMeta.alt}
            className="max-w-full object-cover"
          />
        </div>
        )}
      </div>
        <p className="dark:text-graysuit text-scapaflow">{caseItem.field_date}</p>
        <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
          {caseItem.title}
        </h3>
    </Link>
  );
}