import { Client } from "@/components/logo-wall/client";
import { Client as ClientType } from "@/lib/zod/client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function ClientsListing({
  listingId,
}: {
  listingId: string;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`clients-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(
        `/api/clients-listing/${router.locale}`,
        {
          headers: {
            "accept-language": router.locale,
          },
        },
      );

      return await response.json();
    },
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ul className="flex flex-wrap justify-center items-center">
        {!isLoading &&
          data?.map((client: ClientType) => (
            <li key={client.id} >
              <Client client={client} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
