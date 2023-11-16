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
          <div className="w-full h-38">
            <Image
              src={absoluteUrl(caseItem.field_image.uri.url)}
              className="object-cover"
              alt={caseItem.field_image.resourceIdObjMeta.alt}
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
        <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
          {caseItem.title}
        </h3>
    </Link>
  );
}