import { OverviewItemsViewRowType } from '@ror/js-api-client'
import { DashboardBox } from './dashboard-box'
import { cn } from '@/utils/clsxm'

const colorMap = {
  green: { bg: 'bg-green-600', text: 'text-green-900', border: 'border-green-900' },
  yellow: { bg: 'bg-yellow-600', text: 'text-yellow-900', border: 'border-yellow-900' },
  red: { bg: 'bg-red-600', text: 'text-red-900', border: 'border-red-900' },
}

const BoxRow = ({ color, title, value }: { color: keyof typeof colorMap; title: string; value: number }) => {
  const cm = colorMap[color]
  return (
    <div className='flex justify-between'>
      <span>{title}</span>
      <span className={cn(cm.bg, cm.text, cm.border, 'border px-1 min-w-10 text-center rounded-md')}>{value}</span>
    </div>
  )
}

export const OverviewBox = ({ item }: { item: OverviewItemsViewRowType }) => (
  <DashboardBox title={item.itemName.fieldValue || 'Name missing'} className='flex flex-col gap-1' half>
    <BoxRow
      color={'green'}
      title={item.greenTitle.fieldValue || 'Title missing'}
      value={item.greenNumber.fieldValue || 0}
    />
    <BoxRow
      color={'yellow'}
      title={item.yellowTitle.fieldValue || 'Title missing'}
      value={item.yellowNumber.fieldValue || 0}
    />
    <BoxRow color={'red'} title={item.redTitle.fieldValue || 'Title missing'} value={item.redNumber.fieldValue || 0} />
  </DashboardBox>
)
