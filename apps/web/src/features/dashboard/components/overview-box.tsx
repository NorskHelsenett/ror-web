import { DashboardBox } from './dashboard-box'
import { cn } from '@/utils/clsxm'

export interface OverviewItem {
  title: { fieldValue: string }
  greenItemTitle: { fieldValue: string }
  greenItemNumber: { fieldValue: number }
  yellowItemTitle: { fieldValue: string }
  yellowItemNumber: { fieldValue: number }
  redItemTitle: { fieldValue: string }
  redItemNumber: { fieldValue: number }
}

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
      <span className={cn(cm.bg, cm.text, cm.border, 'border w-10 text-center rounded-md')}>{value}</span>
    </div>
  )
}

export const OverviewBox = ({ item }: { item: OverviewItem }) => (
  <DashboardBox title={item.title.fieldValue} className='flex flex-col gap-1' half>
    <BoxRow color={'green'} title={item.greenItemTitle.fieldValue} value={item.greenItemNumber.fieldValue} />
    <BoxRow color={'yellow'} title={item.yellowItemTitle.fieldValue} value={item.yellowItemNumber.fieldValue} />
    <BoxRow color={'red'} title={item.redItemTitle.fieldValue} value={item.redItemNumber.fieldValue} />
  </DashboardBox>
)
