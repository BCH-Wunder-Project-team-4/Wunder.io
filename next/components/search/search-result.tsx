import { Badge } from "@/ui/badge";
import { ResultViewProps } from "@elastic/react-search-ui-views";

export function SearchResult({ result }: ResultViewProps) {
  return (
    <li key={result.id.raw} className="my-4 block rounded p-8  border-finnishwinter dark:border-scapaflow border-2 dark:shadow-scapaflow  hover:shadow-lg hover:shadow-primary-100">
      <a href={result.path.raw}>
        <h2 className="mb-4 text-xl font-bold text-primary-600 dark:text-fog">
          {result.title.raw}
        </h2>
        <p className="mb-6 text-md ">{result.excerpt.raw}</p>
        <Badge variant="info" size="sm">
          {result.content_type.raw}
        </Badge>
      </a>
    </li>
  );
}
