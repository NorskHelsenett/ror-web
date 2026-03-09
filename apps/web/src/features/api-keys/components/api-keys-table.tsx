'use client'

import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { DeleteApiKeyButton } from './delete-api-key-button'

type ApiKey = {
  id: string
  displayName: string
  created: string | Date
  expires?: string | Date | null
}

const isEffectivelyNeverExpiring = (date: Date): boolean => {
  const hundredYearsFromNow = new Date()
  hundredYearsFromNow.setFullYear(hundredYearsFromNow.getFullYear() + 100)
  return date > hundredYearsFromNow
}

export const ApiKeysTable = ({ keys }: { keys: ApiKey[] }) => {
  const router = useRouter()

  return (
    <div className='overflow-hidden rounded-lg border'>
      <table className='w-full table table-auto'>
        <thead>
          <tr>
            <th className='border border-t-0 border-l-0 px-2 py-1'>Name</th>
            <th className='border border-t-0 px-2 py-1'>Created</th>
            <th className='border border-t-0 px-2 py-1'>Expires</th>
            <th className='border border-t-0 border-r-0 px-2 py-1'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k.id} className='last:[&>td]:border-b-0'>
              <td className='border border-l-0 px-2 py-1'>{k.displayName}</td>
              <td className='border px-2 py-1'>{format(new Date(k.created), 'dd.MM.yy, HH:mm')}</td>
              <td className='border px-2 py-1'>
                {isEffectivelyNeverExpiring(new Date(k.expires!))
                  ? 'No expiration'
                  : format(new Date(k.expires!), 'dd.MM.yy, HH:mm')}
              </td>
              <td className='border border-r-0 px-2 py-1 text-center'>
                <DeleteApiKeyButton apikeyId={k.id} onDeleted={() => router.refresh()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
