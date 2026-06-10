/*
 * FILE OVERVIEW:
 *
 * A wrapper component for a responsive grid layout using `react-grid-layout`.
 */

import { cn } from '@/utils/clsxm'
import { CopyButton } from './copy-button'

/**
 * Renders a card header with a title and a horizontal rule.
 *
 * @param title - The title text to display in the card header.
 * @returns A React element containing the styled card header.
 */
export const CardHeader = ({ title }: { title: string }) => (
  <div className='mb-2'>
    <h2 className='text-xl font-semibold'>{title}</h2>
    <hr />
  </div>
)

/**
 * A reusable card item component that displays a label in bold and renders its children below.
 *
 * @param label - The label text to display in bold at the top of the card item.
 * @param children - The content to display below the label.
 *
 * @example
 * <CardItem label="Username">john_doe</CardItem>
 */
export const CardItem = ({
  label,
  value,
  children,
  className,
  copyable,
}: {
  label: string
  value?: string
  children?: React.ReactNode
  className?: string
  copyable?: boolean
}) => (
  <div className={cn('flex flex-col', className)}>
    <p className='font-bold'>{label}</p>
    {!value && children && <div>{children}</div>}
    {value && (
      <div className='flex items-center'>
        {copyable && value && <CopyButton className='-ml-1 -my-1' value={value} />}
        <div>{value}</div>
      </div>
    )}
  </div>
)
