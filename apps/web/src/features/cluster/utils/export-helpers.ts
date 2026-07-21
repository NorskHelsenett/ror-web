/*
 * FILE OVERVIEW:
 *
 * Utility functions for exporting Kubernetes cluster data in various formats.
 */

import { exportAsCSV, exportAsExcel } from '@/utils/export-utils'
import type { ClusterListViewRowType } from '@ror/js-api-client'
import {
  getClusterIdView,
  getClusterNameView,
  getEnvironmentView,
  getKubernetesVersionView,
  getNodepoolsCountView,
  getPriceMonthView,
  getPriceYearView,
  getProviderView,
  getResourcesCpuUsedPercentNumberView,
  getRorAgentVersionView,
  getServiceIdView,
} from './cluster'

/**
 * Extracts and formats exportable information from a KubernetesCluster object.
 *
 * @param c - The KubernetesCluster object containing cluster data and metadata.
 * @returns An object with selected cluster properties including IDs, names, resource percentages,
 *          pricing, versions, node pool count, and service tags.
 */
const exportableFromCluster = (cluster: ClusterListViewRowType) => {
  return {
    clusterId: getClusterIdView(cluster),
    clusterName: getClusterNameView(cluster),
    provider: getProviderView(cluster),
    environment: getEnvironmentView(cluster),
    nodePoolCount: getNodepoolsCountView(cluster),
    // TODO: Set up resources
    cpu: getResourcesCpuUsedPercentNumberView(cluster),
    memory: getResourcesCpuUsedPercentNumberView(cluster),
    // gpu: getResourcesCpuView,
    // disk: getResourcesCpuView,
    monthlyPrice: getPriceMonthView(cluster),
    yearlyPrice: getPriceYearView(cluster),
    kubernetesVersion: getKubernetesVersionView(cluster),
    agentVersion: getRorAgentVersionView(cluster),
    serviceId: getServiceIdView(cluster),
    // TODO: Fix tags
    // serviceTags: getTagsView(cluster)
  }
}

/**
 * Exports an array of Kubernetes clusters as a CSV file.
 *
 * @param clusters - The list of ClusterListViewRowType objects to export.
 * @param filename - The desired name for the exported CSV file.
 * @returns A promise or result from the exportAsCSV function, which handles the CSV generation and download.
 */
export const exportClustersAsCSV = (clusters: ClusterListViewRowType[], filename: string) =>
  exportAsCSV(clusters, filename, exportableFromCluster)

/**
 * Exports an array of Kubernetes clusters as an Excel file.
 *
 * @param clusters - The list of ClusterListViewRowType objects to export.
 * @param filename - The desired name for the exported Excel file.
 * @returns A promise or result from the exportAsExcel function, representing the export operation.
 */
export const exportClustersAsExcel = (clusters: ClusterListViewRowType[], filename: string) =>
  exportAsExcel(clusters, filename, exportableFromCluster, 'Clusters')
