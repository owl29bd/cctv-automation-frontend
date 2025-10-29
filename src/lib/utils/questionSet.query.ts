// import {
//   MRT_ColumnFilterFnsState,
//   MRT_ColumnFiltersState,
//   MRT_SortingState,
// } from "material-react-table";

// import { QUERYKEYS } from "@/lib/constants/query-keys";
// import { QuestionSetRes } from "@/lib/dtos/question-set.dto";
// import questionSetService from "@/lib/services/questionSet.service";
// import { useQuery } from "@tanstack/react-query";

// export const useGetQuestionSetQuery = ({
//   pagination,
//   sorting,
//   search,
//   columnFilters,
//   columnFilterFns,
// }: {
//   pagination: { pageIndex: number; pageSize: number };
//   sorting?: MRT_SortingState;
//   search?: string;
//   columnFilters?: MRT_ColumnFiltersState;
//   columnFilterFns?: MRT_ColumnFilterFnsState;
// }) => {
//   const params: QueryParams = {
//     limit: pagination.pageSize,
//     page: pagination.pageIndex + 1,
//     sortBy: [],
//     filter: [],
//   };

//   sorting?.forEach((sort) => {
//     params.sortBy?.push(`${sort.id}:${sort.desc ? "desc" : "asc"}`);
//   });

//   columnFilters?.forEach((filter) => {
//     params.filter?.push(`${filter.id}:${filter.value}`);
//   });

//   if (search) {
//     params.search = search;
//   }

//   return useQuery<ApiPaginatedResponse<QuestionSetRes>>({
//     queryKey: [QUERYKEYS.questionSets.getQuestionSets, params],
//     queryFn: () => questionSetService.get(params),
//   });
// };
