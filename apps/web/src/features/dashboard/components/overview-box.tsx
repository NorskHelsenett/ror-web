import { OverviewItemsViewRowType } from '@ror/js-api-client'

const StatItem = ({ color, value, label }: { color: 'emerald' | 'yellow' | 'red'; value: number; label: string }) => {
  const numColor = {
    emerald: 'text-emerald-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
  }[color]
  return (
    <div className='flex flex-col items-center'>
      <span className={`text-3xl font-bold tabular-nums leading-none ${numColor}`}>{value}</span>
      <span className='text-xs text-muted-foreground leading-tight'>{label}</span>
    </div>
  )
}

export const OverviewBox = ({ item }: { item: OverviewItemsViewRowType }) => (
  <div className='bg-(--r-layer) rounded-lg px-4 py-3 flex flex-col gap-3 min-w-[210px]'>
    <p className='text-xl font-semibold'>{item.itemName?.fieldValue ?? 'Unknown'}</p>
    <div className='flex gap-4 justify-center'>
      <StatItem color='emerald' value={item.greenNumber?.fieldValue ?? 0} label={item.greenTitle?.fieldValue ?? ''} />
      <StatItem color='yellow' value={item.yellowNumber?.fieldValue ?? 0} label={item.yellowTitle?.fieldValue ?? ''} />
      <StatItem color='red' value={item.redNumber?.fieldValue ?? 0} label={item.redTitle?.fieldValue ?? ''} />
    </div>
  </div>
)
