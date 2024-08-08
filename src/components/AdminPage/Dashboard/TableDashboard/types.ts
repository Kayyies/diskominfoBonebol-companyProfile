// types.ts

export interface DataItem {
  category?: string;
  title?: string;
  createdAt?: string;
  desc?: string;
  slugLink?: URL;
  image?: string;
}

export interface Props {
  datas: DataItem[];
  headers: string[];
  sortableIcon: (
    index: number,
    isSorted: boolean,
    sortDirection: "asc" | "desc",
  ) => JSX.Element;
  onRefresh: () => void;
  isLoading: boolean;
}
