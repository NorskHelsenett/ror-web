import { getRorApi } from '@/services/ror-api'
import { Tile } from '@ror/react/components/tile'
import { ApiKeysTable } from './api-keys-table'
import { ApiKeysTileHeaderCreate } from './api-keys-tile-header-create'

export async function ApiKeysTile() {
  try {
    const api = await getRorApi()
    const keys = (await api.apiKey.list()).data ?? []
    const now = Date.now()
    const isExpired = (k: (typeof keys)[number]) => !!k.expires && new Date(k.expires).getTime() <= now
    const activeKeys = keys.filter((k) => !isExpired(k))
    const expiredKeys = keys.filter(isExpired)

    return (
      <Tile className='p-5 mt-8'>
        <ApiKeysTileHeaderCreate />
        {activeKeys.length === 0 ? (
          <p className='px-2 py-3 text-sm text-muted-foreground'>No active API keys</p>
        ) : (
          <ApiKeysTable keys={activeKeys} />
        )}
        {expiredKeys.length > 0 && (
          <>
            <hr className='my-4' />
            <h4 className='mb-4'>Expired API keys</h4>
            <ApiKeysTable keys={expiredKeys} expired />
          </>
        )}
      </Tile>
    )
  } catch (error) {
    console.error('Failed to fetch API keys', error)
    return (
      <Tile className='p-5 mt-8'>
        <ApiKeysTileHeaderCreate />
        An unexpected error occurred. We could not fetch your API keys.
      </Tile>
    )
  }
}
