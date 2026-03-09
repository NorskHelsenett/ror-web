import { cn } from '@/utils/clsxm'
import { isTemp } from '@/features/cluster/config/create-cluster-helpers'
import { hoveredCellStyling, table1CellStyling, tableBlue } from '@/features/cluster/config/create-cluster-styling'
import { Region, Provider } from '@/features/cluster/types/create-cluster'
import { Check } from 'lucide-react'

interface RegionOption {
  provider: Provider
  region: Region
  valid: boolean
}

interface RegionItem {
  key: Region
  display: string
}

export interface ProviderRow {
  label: string
  providerKey: Provider
  rowIndex: number
  options: RegionOption[]
}

interface RegionProviderMatrixTableProps {
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

export const RegionProviderMatrixTable = ({
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
}: RegionProviderMatrixTableProps) => (
  <div className={cn('hidden', 'sm:block sm:w-lg sm:overflow-hidden sm:rounded-lg sm:border')}>
    <table className='w-full table table-fixed'>
      <thead>
        <tr className={cn('border-b', 'sm:h-16')}>
          <th className={cn('border-r', 'sm:h-16')} />
          {regions.map((region, colIndex) => (
            <th
              key={region.key}
              className={cn(
                'border-r last:border-r-0',
                'sm:h-16',
                hoverCol === null && hoverRow === null && isTemp(region.key, tempRegion) && tableBlue,
                hoveredCellStyling(hoverRow, hoverCol, 0, colIndex)
              )}
              onMouseEnter={() => setHoverCol(colIndex)}
              onMouseLeave={() => setHoverCol(null)}
              onClick={() => {
                setTempProvider('')
                setTempRegion(region.key)
              }}
            >
              {region.display}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={row.providerKey} className={cn('border-b last:border-b-0 border-border', 'sm:h-16')}>
            <th
              className={cn(
                'transition-colors border-r',
                'sm:h-16',
                hoverCol === null && hoverRow === null && isTemp(row.providerKey, tempProvider) && tableBlue,
                hoveredCellStyling(hoverRow, hoverCol, rowIndex + 1, -1)
              )}
              onMouseEnter={() => setHoverRow(rowIndex)}
              onMouseLeave={() => setHoverRow(null)}
              onClick={() => {
                setTempProvider(row.providerKey)
                setTempRegion('')
              }}
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
                  'border-r last:border-r-0',
                  'sm:h-16',
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
                {option.valid && <Check className='mx-auto my-2' />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
