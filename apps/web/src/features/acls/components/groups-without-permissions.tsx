'use client'

import { getSavedPreference, savePreference } from '@/utils/local-storage'
import { Eye, EyeClosed } from 'lucide-react'
import { useEffect, useState } from 'react'

export const GroupsWithoutPermissions = ({ acls }: { acls: string[] }) => {
  const [showGroups, setShowGroups] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const saved = getSavedPreference('profile:showAclsWOPermissions', false)
    setShowGroups(saved)
  }, [])
  const showOpenEye = isHovered ? !showGroups : showGroups

  const toggleGroupDisplay = () => {
    const next = !showGroups
    savePreference('profile:showAclsWOPermissions', next ? 'true' : 'false')
    setShowGroups(next)
  }

  return (
    <>
      <div className='flex justify-between'>
        <h3 className='r-heading-03 mb-2'>Groups without permissions in ROR</h3>
        <button
          className='shrink-0'
          type='button'
          onClick={toggleGroupDisplay}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label={showGroups ? 'Hide groups without permissions' : 'Show groups without permissions'}
          aria-pressed={showGroups}
        >
          {showOpenEye ? <Eye className='h-10 w-10' /> : <EyeClosed className='h-10 w-10' />}
        </button>
      </div>

      {showGroups ? (
        <ul className='list-disc list-inside mt-2'>
          {acls.map((acl) => (
            <li key={acl} className='mb-1'>
              {acl}
            </li>
          ))}
        </ul>
      ) : (
        <p>List is hidden</p>
      )}
    </>
  )
}
