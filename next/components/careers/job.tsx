import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Job } from "@/lib/zod/job";

interface JobProps {
  job: Job;
}

export function Job({ job, ...props }: JobProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div {...props}>
      <HeadingPage>{job.title}</HeadingPage>
      {job.field_excerpt && (
        <div className="my-4 text-xl">{job.field_excerpt}</div>
      )}
      {job.field_image && (
        <figure>
          <Image
            src={absoluteUrl(job.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={job.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          {job.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {job.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {job.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={job.body?.processed}
        />
      )}
    </div>
  );
}
