import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button, type ButtonProps } from '@ror/react/src/components/button'
import { Plus } from 'lucide-react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Button',
  component: Button as ComponentType<ButtonProps>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    children: 'Click me',
  },
  argTypes: {
    icon: {
      control: false,
    },
    size: {
      description: 'The size of the button',
      defaultValue: 'md',
      type: 'string',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    variant: {
      description: 'The style of the button',
      defaultValue: 'primary',
      type: 'string',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
}
export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const AsLink: Story = {
  args: {
    asChild: true,
  },
  render: ({ ...rest }) => (
    <Button {...rest}>
      <a href='https://www.radix-ui.com/primitives/docs/utilities/slot' target='_blank' rel='noopener noreferrer'>
        I&apos;m a link
      </a>
    </Button>
  ),
}

export const IconOnly: Story = {
  args: {
    icon: <Plus />,
    iconOnly: true,
    variant: 'ghost',
    children: null,
  },
}
