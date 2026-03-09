'use client'

import { Button } from '@/components/shadcn/button'
import { Plus } from 'lucide-react'
import { CreateApiKeyForm } from './create-api-key-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const ApiKeysTileHeaderCreate = () => {
  const router = useRouter()
  const [createKey, setCreateKey] = useState(0)
  const openCreate = createKey > 0

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='r-heading-03'>API keys</h3>
        <Button onClick={() => setCreateKey((k) => k + 1)}>
          <Plus /> Create new API key
        </Button>
      </div>
      {openCreate && (
        <>
          <hr />
          <CreateApiKeyForm key={createKey} onCreated={() => router.refresh()} onFinish={() => setCreateKey(0)} />
        </>
      )}
    </>
  )
}
