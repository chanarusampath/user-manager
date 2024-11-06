export type Pagination = { pageIndex?: number; pageSize?: number }

export type PaginatedResponse<T> = {
  data: T[]
  totalItems: number
}
