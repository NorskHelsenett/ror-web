'use client'
import { useId } from 'react'
import type { ChangeEventHandler, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

type ExcludedAttributes = 'className' | 'children'

type PageSizes = number[]
type PageSize = PageSizes[number]

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, ExcludedAttributes> {
  /**
   * Describe in your own words how many items are visible out of the total
   * e.g. "1-10 of total 100 pages"
   */
  itemRangeText?: string | null

  /**
   * Describe in your own words how many number of items per page that is visible
   */
  itemsPerPageText?: string

  /**
   * The current page size
   */
  pageSize?: PageSize

  /**
   * The different choices for how many items per page that is visible
   */
  pageSizes?: PageSizes

  /**
   * Callback function called when the page size is changed.
   */
  onPageSizeChange?: (pageSize: PageSize) => void

  /**
   * If the backwards button should be disabled
   */
  backwardsDisabled?: boolean

  /**
   * If the forwards button should be disabled
   */
  forwardsDisabled?: boolean

  /**
   * Callback function called when the backwards button is clicked.
   */
  onBackwards?: () => void

  /**
   * Callback function called when the forwards button is clicked.
   */
  onForwards?: () => void

  /**
   * Provide an optional className to the container
   */
  className?: string
}

const baseClass = 'r-pagination'
const textClass = `${baseClass}__text`
const btnClass = `${baseClass}__btn`

export function Pagination({
  itemRangeText,
  itemsPerPageText = 'Items per page',
  className,
  pageSize = 10,
  pageSizes = [10, 25, 50, 75, 100],
  onPageSizeChange,
  onBackwards,
  backwardsDisabled = true,
  onForwards,
  forwardsDisabled = false,
  ...rest
}: PaginationProps) {
  const classes = clsx(baseClass, className)
  const paginationPageCountId = useId()

  const handleOnBackwards = () => {
    if (typeof onBackwards === 'function') {
      onBackwards()
    }
  }

  const handleOnForwards = () => {
    if (typeof onForwards === 'function') {
      onForwards()
    }
  }

  const handleOnPageSizeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(Number(event.target.value))
    }
  }

  return (
    <div className={classes} {...rest}>
      <div className={`${baseClass}__start`}>
        {itemRangeText ? <span className={`${textClass} ${baseClass}__items-range`}>{itemRangeText}</span> : null}
      </div>
      <div className={`${baseClass}__end`}>
        <div className={`${baseClass}__page-size`}>
          <label
            htmlFor={`${baseClass}-page-count-${paginationPageCountId}`}
            className={`${textClass} ${baseClass}__label`}
          >
            {itemsPerPageText}:
          </label>
          <select
            id={`${baseClass}-page-count-${paginationPageCountId}`}
            className={`${baseClass}__select`}
            value={pageSize}
            onChange={handleOnPageSizeChange}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className={`${baseClass}__controls`}>
          <Button
            variant='ghost'
            iconOnly
            icon={<ChevronLeft />}
            className={btnClass}
            onClick={handleOnBackwards}
            disabled={backwardsDisabled}
          />
          <Button
            variant='ghost'
            iconOnly
            icon={<ChevronRight />}
            className={btnClass}
            onClick={handleOnForwards}
            disabled={forwardsDisabled}
          />
        </div>
      </div>
    </div>
  )
}
