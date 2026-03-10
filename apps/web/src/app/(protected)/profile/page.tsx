import { authGuard } from '@/features/auth/utils/auth-guard'
import { getRorApi } from '@/services/ror-api'
import { localizeDate } from '@/utils/time-and-date'
import { Acl } from '@ror/js-api-client'
import { Tile } from '@ror/react/components/tile'
import { jwtDecode } from 'jwt-decode'
import { Copy, Eye, EyeClosed } from 'lucide-react'
import { CopyButton } from '@/components/ui/copy-button'
import Link from 'next/link'
import { Suspense } from 'react'
import { ApiKeysTile } from '@/features/api-keys/components/api-keys-tile'
import { ApiKeysTileLoading } from '@/features/api-keys/components/api-keys-tile-loading'
import { GroupsWithoutPermissions } from '@/features/acls/components/groups-without-permissions'

export const dynamic = 'force-dynamic'

type ProfilePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const session = await authGuard()
  const api = await getRorApi()
  const decodedAuthToken = jwtDecode(session.accessToken)
  const self = await api.users.self()

  const acls: string[] = self.user.groups
  const aclsBeingUsed: Acl[] = []
  const aclsNotBeingUsed: string[] = []

  for (const acl of acls) {
    const res = await api.acl.getByName(acl)
    if (res.data.length > 0) {
      aclsBeingUsed.push(...res.data)
    } else {
      aclsNotBeingUsed.push(acl)
    }
  }

  const sp = (await searchParams) ?? {}
  const showToken = sp.showToken === '1'

  return (
    <div className='p-10'>
      <header>
        <h1 className='mb-2'>{self.user.name}</h1>
        <p className='text-(--r-text-secondary)'>{self.user.email}</p>
      </header>

      <div className='mt-10 grid grid-cols-14 gap-8 max-w-480'>
        <div className='col-span-8'>
          <Tile className='p-5'>
            <h3 className='r-heading-03 mb-4'>Groups with permissions in ROR</h3>
            <div className={'overflow-hidden rounded-lg border'}>
              <table className='w-full table table-auto'>
                <thead>
                  <tr>
                    <th className='border border-t-0 border-l-0 px-2 py-1'>Group</th>
                    <th className='border border-t-0 px-2 py-1'>Scope</th>
                    <th className='border border-t-0 px-2 py-1'>Subject</th>
                    <th className='border border-t-0 border-r-0 px-2 py-1'>Access</th>
                  </tr>
                </thead>
                <tbody>
                  {aclsBeingUsed.map((acl) => (
                    <tr key={acl.id ?? acl.group ?? crypto.randomUUID()} className='last:[&>td]:border-b-0'>
                      <td className='border border-l-0 px-2 py-1'>{acl.group}</td>
                      <td className='border px-2 py-1'>{acl.scope}</td>
                      <td className='border px-2 py-1'>{acl.subject}</td>
                      <td className='border border-r-0 px-2 py-1'>
                        {acl.access?.read && 'Read'}
                        {acl.access?.read && <br />}
                        {acl.access?.create && 'Create'}
                        {acl.access?.create && <br />}
                        {acl.access?.update && 'Update'}
                        {acl.access?.update && <br />}
                        {acl.access?.delete && 'Delete'}
                        {acl.access?.delete && <br />}
                        {acl.access?.owner && 'Owner'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr className='my-4' />
            <GroupsWithoutPermissions acls={aclsNotBeingUsed} />
          </Tile>
        </div>
        <div className='col-span-6'>
          <Tile className='p-5'>
            <h3 className='r-heading-03 mb-4'>Access token</h3>
            <div>
              <span className='w-1/3 font-bold'>Audience</span>
              <span className='w-2/3'>{decodedAuthToken.aud}</span>
            </div>
            <div>
              <span className='w-1/3 font-bold'>Issuer</span>
              <span className='w-2/3'>{decodedAuthToken.iss}</span>
            </div>
            {decodedAuthToken.exp && (
              <div>
                <span className='w-1/3 font-bold'>Expires</span>
                <span className='w-2/3'>{localizeDate(new Date(decodedAuthToken.exp * 1000))}</span>
              </div>
            )}
            {decodedAuthToken.iat && (
              <div>
                <span className='w-1/3 font-bold'>Issued</span>
                <span className='w-2/3'>{localizeDate(new Date(decodedAuthToken.iat * 1000))}</span>
              </div>
            )}
            <hr className='my-4' />
            <h4>Copy access token</h4>
            <CopyButton className='bg-blue-600 min-w-fit p-2 text-sm my-2' value={session.accessToken}>
              <Copy className='mr-2' />
              Access token
            </CopyButton>
            <CopyButton className='bg-blue-600 min-w-fit p-2 text-sm' value={`Bearer ${session.accessToken}`}>
              <Copy className='mr-2' />
              Access token with Bearer
            </CopyButton>
            <hr className='my-4' />
            <div className='flex items-center'>
              <h4>See access token</h4>

              <Link
                className='ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent'
                href={showToken ? '?showToken=0' : '?showToken=1'}
                aria-label={showToken ? 'Hide access token' : 'Show access token'}
              >
                {showToken ? <Eye className='h-4 w-4' /> : <EyeClosed className='h-4 w-4' />}
              </Link>
            </div>

            <p className={showToken ? 'w-full whitespace-normal break-all' : 'w-full overflow-hidden'}>
              {showToken
                ? session.accessToken
                : '**********************************************************************************'}
            </p>
          </Tile>
          <Suspense fallback={<ApiKeysTileLoading />}>
            <ApiKeysTile />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
