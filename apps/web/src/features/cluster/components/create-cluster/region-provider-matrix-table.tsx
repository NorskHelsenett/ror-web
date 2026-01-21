import { cn } from '@/utils/clsxm'
import { X } from 'lucide-react'
import { isTemp } from '@/features/cluster/config/create-cluster-helpers'
import {
  hoveredCellStyling,
  outerTableStyling,
  table1CellStyling,
  tableBlue,
  tableStyling,
} from '@/features/cluster/config/create-cluster-styling'
import { Region, Provider } from '@/features/cluster/types/create-cluster'

type RegionOption = {
  provider: Provider
  region: Region
  valid: boolean
}

type RegionItem = { key: Region; display: string }
export type ProviderRow = {
  label: string
  providerKey: Provider
  rowIndex: number
  options: RegionOption[]
}

type Props = {
  regions: RegionItem[]
  tempRegion: Region
  tempProvider: Provider
  setTempRegion: (r: Region) => void
  setTempProvider: (p: Provider) => void
  rows: ProviderRow[]
  hoverRow: number | null
  hoverCol: number | null
  setHoverRow: (v: number | null) => void
  setHoverCol: (v: number | null) => void
}

export function RegionProviderMatrixTable({
  regions,
  tempRegion,
  tempProvider,
  setTempRegion,
  setTempProvider,
  rows,
  hoverRow,
  hoverCol,
  setHoverRow,
  setHoverCol,
}: Props) {
  const REGION_ROW = 0

  return (
    <table className={cn(outerTableStyling, 'w-2xl table-fixed')}>
      <tbody>
        {/* Header row */}
        <tr className='h-20'>
          <th className={cn(tableStyling, 'h-20')} />
          {regions.map((region, colIndex) => (
            <th
              key={region.key}
              className={cn(
                tableStyling,
                'p-4 h-20',
                hoverCol === null && hoverRow === null && isTemp(region.key, tempRegion) && tableBlue,
                hoveredCellStyling(hoverRow, hoverCol, REGION_ROW, colIndex)
              )}
              onMouseEnter={() => setHoverCol(colIndex)}
              onMouseLeave={() => setHoverCol(null)}
              onClick={() => setTempRegion(region.key)}
            >
              {region.display}
            </th>
          ))}
        </tr>

        {/* Provider rows */}
        {rows.map((row) => (
          <tr key={row.providerKey} className='h-20'>
            <th
              className={cn(
                tableStyling,
                'p-4 h-20 transition-colors',
                hoverCol === null && hoverRow === null && isTemp(row.providerKey, tempProvider) && tableBlue,
                hoveredCellStyling(hoverRow, hoverCol, row.rowIndex, -1)
              )}
              onMouseEnter={() => setHoverRow(row.rowIndex)}
              onMouseLeave={() => setHoverRow(null)}
              onClick={() => setTempProvider(row.providerKey)}
            >
              {row.label}
            </th>

            {row.options.map((option, colIndex) => (
              <td
                key={`${option.provider}-${option.region}-${colIndex}`}
                className={cn(
                  hoverCol === null &&
                    hoverRow === null &&
                    table1CellStyling(option.provider, option.region, tempRegion, tempProvider),
                  'h-20',
                  hoveredCellStyling(hoverRow, hoverCol, row.rowIndex, colIndex)
                )}
                onMouseEnter={() => {
                  setHoverRow(row.rowIndex)
                  setHoverCol(colIndex)
                }}
                onMouseLeave={() => {
                  setHoverRow(null)
                  setHoverCol(null)
                }}
                onClick={() => {
                  if (!option.valid) return
                  setTempProvider(option.provider)
                  setTempRegion(option.region)
                }}
              >
                {option.valid && <X className='mx-auto my-2' />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
