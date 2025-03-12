import type { Meta, StoryObj } from '@storybook/react'
import { Layer, LayerProps } from '@ror/react/src/components/layer'
import { Fragment, type ComponentType } from 'react'
import { Annotation } from '../.storybook/templates/annotation'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Layer',
  component: Layer as ComponentType<LayerProps>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    level: 0,
  },
  argTypes: {
    level: {
      type: 'string',
      description:
        'Which layer to represent the tile on. See referencing docs on Layer model on https://carbondesignsystem.com/elements/color/usage/#layering-tokens',
      options: [0, 1, 2],
      control: 'inline-radio',
    },
  },
} satisfies Meta<typeof Layer>

export default meta
type Story = StoryObj<typeof meta>

function TestComponent() {
  return <div className='example-layer-test-component'>Test component</div>
}

export const Default: Story = {
  render: () => (
    <Fragment>
      <Annotation type='layer' text='Layer 0'>
        <TestComponent />
        <Layer level={1}>
          <Annotation type='layer' text='Layer 1'>
            <TestComponent />
            <Layer level={2}>
              <Annotation type='layer' text='Layer 2'>
                <TestComponent />
              </Annotation>
            </Layer>
          </Annotation>
        </Layer>
      </Annotation>
    </Fragment>
  ),
}

export const CustomLevel: Story = {
  args: {
    level: 2,
  },
  render: (args) => (
    <Layer {...args}>
      <TestComponent />
    </Layer>
  ),
}
