/*
 * FILE OVERVIEW:
 *
 * A wrapper component for a responsive grid layout using `react-grid-layout`.
 */

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
export const CardItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className='flex flex-col'>
    <p className='font-bold'>{label}</p>
    <p>{children}</p>
  </div>
)
