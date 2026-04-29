import * as React from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import { X } from 'lucide-react'
import { cn } from '@/utils/clsxm'

const Dialog = RadixDialog.Root
const DialogTrigger = RadixDialog.Trigger
const DialogClose = RadixDialog.Close

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof RadixDialog.Overlay>) {
  return (
    <RadixDialog.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  )
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof RadixDialog.Content>) {
  return (
    <RadixDialog.Portal>
      <DialogOverlay />
      <RadixDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border-card bg-surface-card p-6 shadow-xl',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className
        )}
        {...props}
      >
        {children}
        <RadixDialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring'>
          <X className='size-4' />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-4', className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof RadixDialog.Title>) {
  return <RadixDialog.Title className={cn('text-base font-semibold text-text-primary', className)} {...props} />
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof RadixDialog.Description>) {
  return <RadixDialog.Description className={cn('text-sm text-text-muted mt-1', className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex justify-end gap-2 mt-6', className)} {...props} />
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
