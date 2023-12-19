import { Checkbox } from "@/ui/checkbox";
import { FacetViewProps } from "@elastic/react-search-ui-views";
import type { FieldValue } from "@elastic/search-ui";
import { getFilterValueDisplay } from "@/lib/search-ui-helpers/getFilterValueDisplay";
import { useId } from "react";
import { useTranslation } from "next-i18next";

export function MultiCheckboxFacet({
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
}: FacetViewProps) {
  const { t } = useTranslation();
  const id = useId();

  if (!options.length) {
    return null;
  }

  return (
    <section className="mb-4">
      <div className="mb-5 text-heading-xs font-bold text-steelgray dark:text-fog">
        {t("filter-by", { label })}
      </div>
      <ul className="mb-2">
        {options.map((option) => {
          const checked = option.selected;
          const value = option.value as FieldValue;
          const labelId = `${option.value}-label-${id}`;
          const checkboxId = `${option.value}-checkbox${id}`;
          return (
            <li
              key={`${getFilterValueDisplay(option.value)}`}
              className="flex items-center text-sm text-steelgray dark:text-fog"
            >
              <Checkbox
                aria-labelledby={labelId}
                checked={checked}
                onClick={() => (checked ? onRemove(value) : onSelect(value))}
                id={checkboxId}
              />
              <label className="ml-2 text-sm dark:text-fog" htmlFor={checkboxId} id={labelId}>
                {getFilterValueDisplay(option.value)} ({option.count})
              </label>
            </li>
          );
        })}
      </ul>
      {showMore && (
        <button
          type="button"
          className="rounded border border-primary-500 bg-transparent px-4 py-2 text-sm font-bold text-primary-600 dark:text-fog hover:border-transparent dark:hover:text-white hover:bg-primary-500 hover:text-white"
          onClick={onMoreClick}
          aria-label={t("search-show-more-options")}
        >
          + {t("search-show-more-options")}
        </button>
      )}
    </section>
  );
}
