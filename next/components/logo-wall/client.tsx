import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Client } from "@/lib/zod/client";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";

interface ClientProps {
  client: Client;
}

export function Client({ client }: ClientProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Link 
    href={client.field_link.uri}
    key={client.id}
    target="_blank"
    rel="noopener noreferrer">
    <div className="p-4">
      Testing links
    </div>
  </Link>
  );
}
