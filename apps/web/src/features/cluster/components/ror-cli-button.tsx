import { Button } from '@/components/shadcn/button'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { getRorLoginViewItem } from '../utils/cluster'
import type { ClusterListViewRowType } from '@ror/js-api-client'
import { Copy } from 'lucide-react'

export const RorCliButton = ({ size, ...cluster }: ClusterListViewRowType & { size?: 'default' | 'sm' }) => (
  <Button
    variant='rorcli'
    size={size}
    onClick={(e) => {
      e.stopPropagation()
      void copyToClipboard(getRorLoginViewItem(cluster)).catch(() => {})
    }}
    className='font-bold'
  >
    <Copy /> ROR CLI
  </Button>
)
