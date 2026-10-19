import { Check, Minus } from 'lucide-react'
import { ROR_ACCESS_TYPES, type ResourceAccessGroup } from '../utils/access-groups'

const accessLabels = {
  'ror:read': 'Read',
  'ror:create': 'Create',
  'ror:update': 'Update',
} as const

export const ResourceAccessGroupsTable = ({ accessGroups }: { accessGroups: ResourceAccessGroup[] | null }) => {
  if (accessGroups === null) {
    return <p className='text-md text-(--r-text-secondary)'>Could not fetch access groups.</p>
  }

  if (accessGroups.length === 0) {
    return <p className='text-md text-(--r-text-secondary)'>No groups have ROR access to this resource.</p>
  }

  return (
    <div className='min-h-0 overflow-auto rounded-lg border'>
      <table className='w-full table table-auto text-md'>
        {/* Borders on collapsed sticky cells don't follow when scrolling, so the bottom line is drawn with a shadow */}
        <thead className='sticky top-0 z-10 bg-(--r-layer) shadow-[inset_0_-1px_0_var(--border)]'>
          <tr>
            <th className='border border-t-0 border-l-0 px-2 py-1 text-left'>Group</th>
            {ROR_ACCESS_TYPES.map((a) => (
              <th key={a} className='border border-t-0 px-2 py-1'>
                {accessLabels[a]}
              </th>
            ))}
            {/* <th className='border border-t-0 border-r-0 px-2 py-1 text-left'>Granted on</th> */}
          </tr>
        </thead>
        <tbody>
          {accessGroups.map((g) => (
            <tr key={g.group} className='last:[&>td]:border-b-0'>
              <td className='border border-l-0 px-2 py-1 break-all'>{g.group}</td>
              {ROR_ACCESS_TYPES.map((a) => (
                <td key={a} className='border px-2 py-1'>
                  {g.access[a] ? (
                    <Check className='mx-auto h-4 w-4 text-green-600' aria-label={`Has ${accessLabels[a]} access`} />
                  ) : (
                    <Minus
                      className='mx-auto h-4 w-4 text-(--r-text-secondary)'
                      aria-label={`No ${accessLabels[a]} access`}
                    />
                  )}
                </td>
              ))}
              {/* <td className='border border-r-0 px-2 py-1 text-(--r-text-secondary)'>
                {g.grantedOn.map((s) => (
                  <div key={s} className='break-all'>
                    {s}
                  </div>
                ))}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
