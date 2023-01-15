import type { FiltersState } from "@data/reducers/filters";

export interface FiltersProps {
  filters: FiltersState;
  className?: string;
  onClose?: () => void;
  resetFilters: () => void;
  toogleBookmarkFilter: () => void;
  toogleReadFilter: () => void;
  toogleAttachmentsFilter: () => void;
}
