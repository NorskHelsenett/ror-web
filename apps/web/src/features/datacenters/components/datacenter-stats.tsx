import { DataCenter } from '@ror/js-api-client'
import { CircleCheck, Flag, Globe, Server } from 'lucide-react'
import { ReactNode } from 'react'

interface DatacenterStatsProps {
  items: DataCenter[]
}

export function DatacenterStats({ items }: DatacenterStatsProps) {
  const regions = new Set(items.map((i) => i.datacenter.legacy?.location?.region).filter(Boolean))
  const countries = new Set(items.map((i) => i.datacenter.legacy?.location?.country).filter(Boolean))

  return (
    <div className='flex flex-wrap gap-3'>
      <StatTile icon={<Server className='size-5' />} value={items.length} label='Datacenters' />
      <StatTile icon={<Globe className='size-5' />} value={regions.size} label='Regions' />
      <StatTile
        icon={<Flag className='size-5' />}
        value={countries.size}
        label={countries.size === 1 ? 'Country' : 'Countries'}
      />
    </div>
  )
}

function StatTile({ icon, value, label }: { icon: ReactNode; value: number | string; label: string }) {
  return (
    <div className='flex items-center gap-3 bg-(--r-layer) rounded-xl px-5 py-3 min-w-[160px]'>
      <span className='text-muted-foreground'>{icon}</span>
      <div>
        <p className='text-lg font-semibold leading-tight'>{value}</p>
        <p className='text-xs text-muted-foreground'>{label}</p>
      </div>
    </div>
  )
}
