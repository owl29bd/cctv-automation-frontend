import { MRT_ColumnFiltersState, MRT_SortingState } from "material-react-table";

interface QueryParamBuilder {
  pagination: { pageIndex: number; pageSize: number };
  sorting?: MRT_SortingState;
  search?: string;
  columnFilters?: MRT_ColumnFiltersState;
}

export function queryParamBuilder({
  pagination,
  sorting = [],
  search,
  columnFilters = [],
}: QueryParamBuilder): QueryParams {
  const params: QueryParams = {
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    sortBy: sorting.map((sort) => `${sort.id}:${sort.desc ? "desc" : "asc"}`),
    filter: columnFilters.map((filter) => `${filter.id}:${filter.value}`),
  };

  if (search) {
    params.search = search;
  }

  return params;
}
