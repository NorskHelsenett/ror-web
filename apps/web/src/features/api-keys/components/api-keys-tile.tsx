import { getRorApi } from '@/services/ror-api'
import { Tile } from '@ror/react/components/tile'
import { ApiKeysTable } from './api-keys-table'
import { ApiKeysTileHeaderCreate } from './api-keys-tile-header-create'

export async function ApiKeysTile() {
  try {
    const api = await getRorApi()
    const keys = (await api.apiKey.list()).data ?? []

    return (
      <Tile className='p-5 mt-8'>
        <ApiKeysTileHeaderCreate />
        {keys.length === 0 ? (
          <p className='px-2 py-3 text-sm text-muted-foreground'>No API keys</p>
        ) : (
          <ApiKeysTable keys={keys} />
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
