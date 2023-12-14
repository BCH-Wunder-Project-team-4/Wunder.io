import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { ExpertTalkTeaser } from "@/components/expertTalk/expertTalk-teaser";
import { ExpertTalkTeaser as ExpertTalkTeaserType } from "@/lib/zod/expertTalk-teaser";
import Link from "next/link";
import { buttonVariants } from "@/ui/button";
import clsx from "clsx";
import { useTranslation } from "next-i18next";

interface LatestExpertTalksProps {
  expertTalks?: ExpertTalkTeaserType[];
  heading: string;
}

export function ExpertTalkTeasers({ expertTalks, heading }: LatestExpertTalksProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        {expertTalks?.map((expertTalk) => (
          <li key={expertTalk.id}>
            <ExpertTalkTeaser expertTalk={expertTalk} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!expertTalks?.length && <p className="py-4">{t("no-content-found")}</p>}
        {expertTalks?.length && (
          <Link
            href="/all-expertTalks"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            All expert talks
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
