export type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }
export type LoadMoreOptsWithSearch = {
  offset: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  searchField?: string
}
