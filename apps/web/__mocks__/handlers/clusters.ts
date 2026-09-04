/**
 * this fileset is an example to mock API handlers for for clusters v1 in the ROR web application
 * this is not used in the current implementation, but kept for reference for v2
 */

import { http, HttpResponse } from 'msw'
import { alphabetical } from 'radash'

//import { clustersVersion1 } from '../data/clusters'
import { createPaginatedResponse, type PaginatedResponse } from '../utils/paginated-response'
import { getRorAPIPath } from '../utils/mock-base-url'
import { clustersVersion1 } from '../data/clusters'
type ClusterVersionOne = (typeof clustersVersion1)[number]

/**
 * The body of the request to filter clusters.
 * This is used to mock the ROR API endpoint for filtering clusters.
 */
interface FilterBody {
  limit?: number // The number of clusters to return in the response
  skip?: number // The number of clusters to skip in the response
  sort?: [
    {
      sortField: 'clusterName' // The field to sort the clusters by
      sortOrder: 1 | -1 // The order to sort the clusters in, 1 for ascending and -1 for descending
    },
  ]
}

/**
 * Handler will not be used, as it is made for Cluster v1. It is kept here for reference.
 * Defines mock handlers for cluster-related API endpoints.
 */
export const clustersHandlers = [
  // Mock POST /v1/clusters/filter to filter, sort, and paginate clusters
  http.post<never, FilterBody, PaginatedResponse<ClusterVersionOne>>(
    getRorAPIPath('/v1/clusters/filter'), // Builds full mock path
    async ({ request }) => {
      // Parse the request body as JSON
      const payload = await request.json()

      // Set default pagination values if not provided
      const pagination = {
        limit: payload?.limit ?? 10,
        skip: payload?.skip ?? 0,
      }

      // Start with a copy of all mock clusters
      let filteredClusters = [...clustersVersion1]

      // If sorting by 'clusterName' is requested, apply it using Radash
      if (Array.isArray(payload?.sort) && payload.sort.length > 0 && payload.sort[0].sortField === 'clusterName') {
        const sortOrder = payload.sort[0].sortOrder === -1 ? 'desc' : 'asc'
        filteredClusters = alphabetical(clustersVersion1, (c) => c.clusterName, sortOrder)
      }

      // Generate paginated response
      const paginatedResponse = createPaginatedResponse(pagination, filteredClusters)

      // Return the paginated response as JSON
      return HttpResponse.json(paginatedResponse)
    }
  ),

  // Mock GET /v1/clusters/:clusterId to retrieve a single cluster by ID
  http.get(getRorAPIPath('/v1/clusters/:clusterId'), ({ params }) => {
    // Look up the cluster by its ID from the mock data
    const singleCluster = clustersVersion1.find((c) => c.clusterId === params.clusterId)

    // If not found, return a 404 error
    if (!singleCluster) {
      return HttpResponse.json({ error: 'Cluster not found' }, { status: 404 })
    }

    // Otherwise, return the cluster data as JSON
    return HttpResponse.json(singleCluster)
  }),
]
