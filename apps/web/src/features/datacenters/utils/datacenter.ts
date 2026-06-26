import { DataCenter } from '@ror/js-api-client'

/**
 * Retrieves the legacy name of a given datacenter.
 *
 * @param datacenter - The DataCenter object containing datacenter information.
 * @returns The legacy name of the datacenter if available; otherwise, undefined.
 */
export function getDatacenterName(datacenter: DataCenter) {
  return datacenter?.datacenter?.legacy?.name
}

/**
 * Retrieves the provider information from a given datacenter object.
 *
 * @param datacenter - The datacenter object containing provider details.
 * @returns The provider of the datacenter if available; otherwise, undefined.
 */
export function getDatacenterProvider(datacenter: DataCenter) {
  return datacenter?.datacenter?.legacy?.provider
}

/**
 * Retrieves the region of a given datacenter.
 *
 * @param datacenter - The DataCenter object containing datacenter details.
 * @returns The region string if available, otherwise undefined.
 */
export function getDatacenterRegion(datacenter: DataCenter) {
  return datacenter?.datacenter?.legacy?.location?.region
}

/**
 * Retrieves the country of a given datacenter.
 *
 * @param datacenter - The DataCenter object containing datacenter information.
 * @returns The country of the datacenter if available; otherwise, undefined.
 */
export function getDatacenterCountry(datacenter: DataCenter) {
  return datacenter?.datacenter?.legacy?.location?.country
}
