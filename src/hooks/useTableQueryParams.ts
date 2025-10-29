import {
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
  MRT_RowData,
  MRT_SortingState,
  type MRT_ColumnDef,
} from "material-react-table";
import { useState } from "react";

interface TableQueryParamsProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  defaultColumnFilters?: MRT_ColumnFiltersState;
}

export default function useTableQueryParams<T extends MRT_RowData>({
  columns,
  defaultColumnFilters = [],
}: TableQueryParamsProps<T>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [search, setSearch] = useState("");

  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const [columnFilters, setColumnFilters] =
    useState<MRT_ColumnFiltersState>(defaultColumnFilters);

  //filter modes
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(
      Object.fromEntries(
        columns.map(({ accessorKey }) => [accessorKey, "contains"]),
      ),
    );

  return {
    pagination,
    setPagination,
    search,
    setSearch,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnFilterFns,
    setColumnFilterFns,
  };
}
