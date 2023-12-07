import { Article as ArticleType } from "@/lib/zod/article";
import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import Image from "next/image";
import { MediaImage } from "./media--image";
import { Paragraph } from "./paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface ArticleProps {
  article: ArticleType;
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
