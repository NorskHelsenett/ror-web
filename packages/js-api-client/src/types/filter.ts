export interface Filter {
  field: string
  value: string
  matchMode: string
}

export interface FilterRequestOptions {
  limit?: number
  skip?: number
  sort?: {
    sortField: string
    sortOrder: number
  }[]
  filter?: Filter[]
}
