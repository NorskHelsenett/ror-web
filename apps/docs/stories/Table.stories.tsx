import type { Meta, StoryObj } from '@storybook/react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableSortHeader,
  TableBody,
  TableCell,
  TableTitle,
  TableSubtitle,
} from '@ror/react/src/components/table/index'
import { SortDirection } from '@ror/react/utils/sorting'
import { MouseEvent } from 'react'

const meta = {
  title: 'ui/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    'aria-labelledby': 'table-title',
    'aria-describedby': 'table-subtitle',
    gridTemplateColumns: 'repeat(3, minmax(max-content, 1fr))',
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ cellPadding, gridTemplateColumns, ...args }) => {
    return (
      <TableContainer>
        <TableTitle id='table-title'>Table Title</TableTitle>
        <TableSubtitle id='table-subtitle'>Table Subtitle</TableSubtitle>
        <Table {...args} cellPadding={cellPadding} gridTemplateColumns={gridTemplateColumns}>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Tags</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>aks-001-dev</TableCell>
              <TableCell>Critical</TableCell>
              <TableCell>a, b, c</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>aks-002-dev</TableCell>
              <TableCell>Healthy</TableCell>
              <TableCell>a, b, c</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
}

export const Sortable: Story = {
  render: ({ cellPadding, gridTemplateColumns, ...args }) => {
    const handleOnSort = (id: string, direction: SortDirection, event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      console.log('Sorting...', id, direction)
    }

    return (
      <TableContainer>
        <TableTitle id='table-title'>Table Title</TableTitle>
        <TableSubtitle id='table-subtitle'>Table Subtitle</TableSubtitle>
        <Table {...args} cellPadding={cellPadding} gridTemplateColumns={gridTemplateColumns}>
          <TableHead>
            <TableRow>
              <TableSortHeader id='name' direction='DESC' onToggleSort={handleOnSort}>
                Cluster
              </TableSortHeader>
              <TableSortHeader id='status' onToggleSort={handleOnSort}>
                Status
              </TableSortHeader>
              <TableSortHeader id='tags' onToggleSort={handleOnSort}>
                Tags
              </TableSortHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>aks-001-dev</TableCell>
              <TableCell>Critical</TableCell>
              <TableCell>a, b, c</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>aks-002-dev</TableCell>
              <TableCell>Healthy</TableCell>
              <TableCell>a, b, c</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
}
