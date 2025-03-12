import type { Meta, StoryObj } from '@storybook/react'
import { Stack, StackProps } from '@ror/react/src/components/stack'
import type { ComponentType } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Stack',
  component: Stack as ComponentType<StackProps>,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      defaultValue: 0,
    },
    as: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    gap: 2,
  },
  render: (args) => (
    <Stack {...args}>
      <div style={{ background: '#f3f3f3', padding: '1rem' }}>Item 1</div>
      <div style={{ background: '#f3f3f3', padding: '1rem' }}>Item 2</div>
      <div style={{ background: '#f3f3f3', padding: '1rem' }}>Item 3</div>
    </Stack>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    gap: 2,
  },
  render: (args) => (
    <Stack {...args}>
      <div style={{ background: '#f3f3f3', padding: '1rem' }}>Item 1</div>
      <div style={{ background: '#f3f3f3', padding: '1rem' }}>Item 2</div>
      <div style={{ background: '#f3f3f3', padding: '1rem' }}>Item 3</div>
    </Stack>
  ),
}
