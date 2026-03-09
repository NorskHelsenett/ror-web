'use client'

import { useState, useTransition } from 'react'
import { deleteApiKey } from '../services/delete-api-key'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/button'
import { Trash } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/shadcn/dialog'

export const DeleteApiKeyButton = ({ apikeyId, onDeleted }: { apikeyId: string; onDeleted: () => void }) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  function handleDelete() {
    startTransition(async () => {
      const success = await deleteApiKey({ apikeyId })

      if (success) {
        toast.success('API key deleted')
        setOpen(false)
        onDeleted()
      } else {
        toast.error('Failed to delete API key')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' type='button' aria-label='Delete API key'>
          <Trash />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete API key?</DialogTitle>
          <DialogDescription>
            This action can&apos;t be undone. The key will stop working immediately.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary' disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button type='button' variant='destructive' onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
