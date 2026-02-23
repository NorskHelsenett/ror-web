import { authGuard } from '@/features/auth/utils/auth-guard'
import { getRorApi } from '@/services/ror-api'
import { localizeDate } from '@/utils/time-and-date'
import { Acl } from '@ror/js-api-client'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { DefinitionDescription, DefinitionList, DefinitionTerm } from '@ror/react/components/definition-list'
import { Layer } from '@ror/react/components/layer'
import { Tile } from '@ror/react/components/tile'
import { jwtDecode } from 'jwt-decode'
import { Fragment } from 'react'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await authGuard()
  const api = await getRorApi()
  const decodedAuthToken = jwtDecode(session.accessToken)
  const self = await api.users.self()
  const acls: string[] = self.user.groups
  const aclsBeingUsed: Acl[] = []
  const aclsNotBeingUsed = []

  for (const acl of acls) {
    const res = await api.acl.getByName(acl)
    if (res.data.length > 0) {
      aclsBeingUsed.push(...res.data)
    } else {
      aclsNotBeingUsed.push(acl)
    }
  }

  return (
    <div className='p-10'>
      <header>
        <h1 className='mb-2'>{self.user.name}</h1>
        <p className='text-(--r-text-secondary)'>{self.user.email}</p>
      </header>

      <div className='mt-10 grid grid-cols-12 gap-8 max-w-240'>
        <div className='col-span-8'>
          <Tile className='p-5'>
            <h3 className='r-heading-03 mb-4'>Groups that grant access in ROR</h3>
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

            <hr className='my-2' />
            <h3 className='r-heading-03 mb-4'>Groups that does not grant access in ROR</h3>
            <ul className='list-disc list-inside'>
              {aclsNotBeingUsed.map((acl) => (
                <li key={acl} className='mb-1'>
                  {acl}
                </li>
              ))}
            </ul>
          </Tile>
        </div>
        <div className='col-span-4'>
          <Tile className='p-5'>
            <h3 className='r-heading-03 mb-8'>Access token</h3>
            <DefinitionList className='justify-between'>
              <DefinitionTerm>Audience</DefinitionTerm>
              <DefinitionDescription>{decodedAuthToken.aud}</DefinitionDescription>
              <DefinitionTerm>Issuer</DefinitionTerm>
              <DefinitionDescription>{decodedAuthToken.iss}</DefinitionDescription>
              {decodedAuthToken.exp ? (
                <Fragment>
                  <DefinitionTerm>Expires</DefinitionTerm>
                  <DefinitionDescription>{localizeDate(new Date(decodedAuthToken.exp * 1000))}</DefinitionDescription>
                </Fragment>
              ) : null}
              {decodedAuthToken.iat ? (
                <Fragment>
                  <DefinitionTerm>Issued</DefinitionTerm>
                  <DefinitionDescription>{localizeDate(new Date(decodedAuthToken.iat * 1000))}</DefinitionDescription>
                </Fragment>
              ) : null}
            </DefinitionList>
            <hr className='my-4' />
            <h3 className='font-semibold text-sm mb-2'>Your access token</h3>
            <Layer level={1}>
              <CodeSnippet type='single'>{session.accessToken}</CodeSnippet>
            </Layer>
            <h3 className='font-semibold text-sm mb-2 mt-4'>Your access token (with Bearer)</h3>
            <Layer level={1}>
              <CodeSnippet type='single'>{`Bearer ${session.accessToken}`}</CodeSnippet>
            </Layer>
          </Tile>
        </div>
      </div>
    </div>
  )
}
