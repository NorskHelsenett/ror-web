import { OverviewItemsViewRowType } from '@ror/js-api-client'

export const OverviewBox = ({ item }: { item: OverviewItemsViewRowType }) => {
  const name = item.itemName?.fieldValue ?? 'Unknown'
  const stats = [
    { color: 'bg-emerald-500', value: item.greenNumber?.fieldValue ?? 0, label: item.greenTitle?.fieldValue ?? '' },
    { color: 'bg-[#edb54a]', value: item.yellowNumber?.fieldValue ?? 0, label: item.yellowTitle?.fieldValue ?? '' },
    { color: 'bg-red-500', value: item.redNumber?.fieldValue ?? 0, label: item.redTitle?.fieldValue ?? '' },
  ]
  const total = stats.reduce((sum, stat) => sum + stat.value, 0)
  const formatCount = (value: number) => value.toLocaleString('en-GB')

  return (
    <div className='border-l border-subtle px-5 py-3 flex flex-col gap-4 min-w-72'>
      <p className='text-xs font-medium uppercase tracking-widest text-muted-foreground'>{name}</p>
      <div className='flex items-baseline gap-2'>
        <span className='text-4xl font-semibold tabular-nums leading-none'>{formatCount(total)}</span>
        <span className='text-sm text-muted-foreground'>{name === 'Vulnerabilities' ? 'findings' : 'total'}</span>
      </div>
      <div
        role='img'
        aria-label={`${name}: ${stats.map((stat) => `${formatCount(stat.value)} ${stat.label}`).join(', ')}`}
        className='flex h-2 w-full overflow-hidden rounded-full bg-muted'
      >
        {stats
          .filter((stat) => stat.value > 0)
          .map((stat) => (
            <div
              key={stat.color}
              className={`${stat.color} h-full shrink-0 border-r border-background last:border-r-0`}
              style={{ width: `${(stat.value / total) * 100}%` }}
            />
          ))}
      </div>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        {stats.map((stat) => (
          <div key={stat.color} className='flex items-center gap-1.5 text-sm'>
            <span aria-hidden='true' className={`${stat.color} size-2 shrink-0 rounded-full`} />
            <span className='font-semibold tabular-nums'>{formatCount(stat.value)}</span>
            <span className='text-muted-foreground'>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
