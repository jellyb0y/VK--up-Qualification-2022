export type FiltersState = {
  bookmarkFilter: boolean;
  readFilter: boolean;
  attachmentsFilter: boolean;
  sortType: SortType;
};

export enum SortType {
  NewestFirst = 'newest',
  OldestFirst = 'oldest',
}
