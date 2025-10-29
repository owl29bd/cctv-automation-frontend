export {};

declare global {
  type ApiPaginatedResponse<T> = {
    limit: number;
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    offset?: number;
    prevPage?: number;
    nextPage?: number;
    pagingCounter: number;
    totalData: number;
    data: T[];
  };

  type BaseResponse = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };

  interface QueryParams {
    limit: number;
    page: number;
    search?: string;
    sortBy?: string[];
    filter?: string[];
  }
}
