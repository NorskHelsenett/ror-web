import { getRorApi } from '@/services/ror-api'
import { groupRorAccess } from '../utils/access-groups'

/**
 * Fetches the groups with ROR access to a resource. Returns null if the lookup fails.
 */
export async function fetchResourceAccessGroups(scope: string, subject: string) {
  try {
    const api = await getRorApi()
    const res = await api.aclV2.lookup(scope, subject)
    return groupRorAccess(res.accessGroups ?? [])
  } catch (error) {
    console.error(`Failed to fetch ACLs for ${scope}/${subject}`, error)
    return null
  }
}
