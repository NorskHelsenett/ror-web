import { authGuard } from '@/app/auth-guard'
import { rorApiClient } from '@/services/ror-api'
import { Tile } from '@ror/react/components/tile'
import { DefinitionList, DefinitionTerm, DefinitionDescription } from '@ror/react/components/definition-list'
import { CodeSnippet } from '@ror/react/components/code-snippet'
import { Layer } from '@ror/react/components/layer'
import { jwtDecode } from 'jwt-decode'
import { Fragment } from 'react'

export default async function ProfilePage() {
  const session = await authGuard()
  const client = rorApiClient(session.accessToken)
  const decodedAuthToken = jwtDecode(session.accessToken)
  const self = await client.users.self()
  return (
    <div className='p-10'>
      <header>
        <h1 className='mb-2'>{self.user.name}</h1>
        <p className='text-(--r-text-secondary)'>{self.user.email}</p>
      </header>

      <div className='mt-10 grid grid-cols-12 gap-8 max-w-[60rem]'>
        <div className='col-span-8'>
          <Tile>
            <h3 className='r-heading-03 mb-8'>Groups</h3>
            <ul className='list-disc list-inside'>
              {self.user.groups.map((group) => (
                <li key={group} className='mb-1'>
                  {group}
                </li>
              ))}
            </ul>
          </Tile>
        </div>
        <div className='col-span-4'>
          <Tile>
            <h3 className='r-heading-03 mb-8'>Access token</h3>
            <DefinitionList className='justify-between'>
              <DefinitionTerm>Audience</DefinitionTerm>
              <DefinitionDescription>{decodedAuthToken.aud}</DefinitionDescription>
              <DefinitionTerm>Issuer</DefinitionTerm>
              <DefinitionDescription>{decodedAuthToken.iss}</DefinitionDescription>
              {decodedAuthToken.exp ? (
                <Fragment>
                  <DefinitionTerm>Expires</DefinitionTerm>
                  <DefinitionDescription>
                    {new Date(decodedAuthToken.exp * 1000).toLocaleString()}
                  </DefinitionDescription>
                </Fragment>
              ) : null}
              {decodedAuthToken.iat ? (
                <Fragment>
                  <DefinitionTerm>Issued</DefinitionTerm>
                  <DefinitionDescription>
                    {new Date(decodedAuthToken.iat * 1000).toLocaleString()}
                  </DefinitionDescription>
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
