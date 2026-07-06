export type LoadMoreOpts = { offset: number; limit: number; sort?: string; order?: 'asc' | 'desc' }
export type LoadMoreOptsWithSearch = LoadMoreOpts & { search?: string; searchField?: string }
