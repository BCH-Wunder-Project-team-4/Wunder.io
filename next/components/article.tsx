import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Article } from "@/lib/zod/article";
import { Paragraph } from "./paragraph";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="grid gap-4">
      {article.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
