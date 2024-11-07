export type Pagination = {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  totalItems: number
  next?: number
  prev?: number
  pages: number
}
