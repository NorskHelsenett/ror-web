import { Tile } from '@ror/react/components/tile'
import { Skeleton } from '@/components/shadcn/skeleton'

export function ApiKeysTileLoading() {
  return (
    <Tile className='p-5 mt-8'>
      <h3 className='r-heading-03 mb-4'>API keys</h3>

      <div className='flex w-full max-w-full flex-col gap-2'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className='flex gap-4' key={index}>
            <Skeleton className='h-4 flex-1 bg-gray-200 dark:bg-gray-800' />
            <Skeleton className='h-4 w-24 bg-gray-200 dark:bg-gray-800' />
            <Skeleton className='h-4 w-20 bg-gray-200 dark:bg-gray-800' />
            <Skeleton className='h-4 w-12 bg-gray-200 dark:bg-gray-800' />
          </div>
        ))}
      </div>
    </Tile>
  )
}
