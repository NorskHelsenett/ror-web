import { Info } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover'

export function FuzzySearchHelp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type='button'
          aria-label='Search tips'
          className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground/60 hover:text-foreground cursor-pointer'
        >
          <Info className='w-4 h-4' />
        </button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-80 text-sm space-y-2'>
        <p className='font-medium'>Search tips</p>
        <p className='text-muted-foreground'>
          The search is fuzzy and ranks results by how closely they match what you type. Results are not an exact
          filter.
        </p>
        <ul className='list-disc pl-4 space-y-1'>
          <li>
            Type the name as it is written, including dashes, e.g. <code>test-cluster-001</code>.
          </li>
          <li>
            Spaces split the text into separate words, so <code>test cluster 001</code> also matches similar names and
            the one you want may not be first.
          </li>
          <li>The more of the name you type, the better the match.</li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
