import { cn } from '@/utils/clsxm'
import { isTemp } from './create-cluster-helpers'

export const tableStyling = 'border border-gray-300'
export const outerTableStyling = 'border border-gray-400 border-collapse w-full'
export const tableBlue = 'bg-blue-100 dark:bg-blue-800 font-semibold'
export const tableDarkerBlue = 'bg-blue-200 dark:bg-blue-900 font-semibold'
export const tableBoldText = 'border border-gray-300 p-2 font-semibold'
export const errorTextStyling = 'text-red-600 text-sm'
export const flexGap4 = 'flex flex-col gap-4'
export const table1CellStyling = (provider: string, region: string, tempRegion: string, tempProvider: string) =>
  cn(
    tableStyling,
    isTemp(region, tempRegion) && tableBlue,
    isTemp(provider, tempProvider) && tableBlue,
    isTemp(region, tempRegion) && isTemp(provider, tempProvider) && tableDarkerBlue
  )
export const hoveredCellStyling = (hoverRow: number | null, hoverCol: number | null, row: number, col: number) =>
  cn(
    tableStyling,
    hoverRow === row && 'bg-blue-800',
    hoverCol === col && 'bg-blue-800',
    hoverRow === row && hoverCol === col && 'bg-blue-900'
  )
