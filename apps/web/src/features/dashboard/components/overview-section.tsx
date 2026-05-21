'use client'
import { useEffect, useState } from 'react'
import { OverviewItem, overviewItemsValues } from '../types/items'
import { addOverviewItem, getOverviewItems, removeOverviewItem } from '../utils/dashboard-localstorage'
import { OverviewBox } from './overview-box'
import { DashboardSection } from './dashboard-section'
import { OverviewItemsViewRowType } from '@ror/js-api-client'
import { DashboardBox } from './dashboard-box'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover'
import { Plus } from 'lucide-react'

interface OverviewSectionProps {
  allItems: OverviewItemsViewRowType[]
}

export const OverviewSection = ({ allItems }: OverviewSectionProps) => {
  const [visibleItems, setVisibleItems] = useState<OverviewItem[]>([...overviewItemsValues])

  useEffect(() => {
    setVisibleItems(getOverviewItems())
  }, [])

  function handleRemove(title: OverviewItem) {
    const updated = removeOverviewItem(title)
    setVisibleItems(updated)
  }

  function handleAdd(title: OverviewItem) {
    const updated = addOverviewItem(title)
    setVisibleItems(updated)
  }

  const missingItems = overviewItemsValues.filter((v) => !visibleItems.includes(v))

  const items = allItems
    .filter(
      (item) => item.itemUid?.fieldValue != null && visibleItems.includes(item.itemName?.fieldValue as OverviewItem)
    )
    .map((item) => ({
      nodeId: item.itemUid?.fieldValue as string,
      nodeTitle: item.itemName?.fieldValue ?? undefined,
      node: <OverviewBox key={item.itemUid?.fieldValue} item={item} />,
    }))

  const addSlot =
    missingItems.length > 0 ? (
      <Popover>
        <PopoverTrigger asChild>
          <button className='shrink-0 text-left bg-transparent border-0 p-0 cursor-pointer self-stretch'>
            <DashboardBox className='border-3 border-dashed bg-transparent h-full' half title=''>
              <div className='w-full h-full flex flex-col justify-center items-center pointer-events-none'>
                <p className='text-2xl'>Add section</p>
                <Plus className='size-12' />
              </div>
            </DashboardBox>
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-48 p-2'>
          <ul className='flex flex-col gap-1'>
            {missingItems.map((item) => (
              <li key={item}>
                <button
                  className='w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors'
                  onClick={() => handleAdd(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    ) : null

  return <DashboardSection title='Overview' items={items} editable onRemove={handleRemove} addSlot={addSlot} />
}
