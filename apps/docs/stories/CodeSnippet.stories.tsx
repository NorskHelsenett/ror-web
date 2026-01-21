import type { Meta, StoryObj } from '@storybook/react'
import { CodeSnippet } from '@ror/react/src/components/code-snippet'
import { TooltipProvider } from '@ror/react/components/tooltip'
import { Annotation } from '../.storybook/templates/annotation'
import { Layer } from '@ror/react/src/components/layer'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Code Snippet',
  component: CodeSnippet,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof CodeSnippet>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    type: 'single',
    children: 'npm install @ror/react@latest @ror/styles@latest @ror/js-api-client@latest',
  },
}

export const Inline: Story = {
  args: {
    type: 'inline',
    children: 'node -v',
  },
}

export const Multi: Story = {
  args: {
    type: 'multi',
    children: `  "scripts": {
        "build": "lerna run build --stream --prefix --npm-client yarn",
        "ci-check": "carbon-cli ci-check",
        "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
        "doctoc": "doctoc --title '## Table of Contents'",
        "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
        "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
        "lint": "eslint actions config codemods packages",
        "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
        "sync": "carbon-cli sync",
        "test": "cross-env BABEL_ENV=test jest",
        "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
      },
      "devDependencies": {
        "@babel/core": "^7.10.0",
        "@babel/plugin-proposal-class-properties": "^7.7.4",
        "@babel/plugin-proposal-export-default-from": "^7.7.4",
        "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
        "@babel/plugin-transform-runtime": "^7.10.0",
        "@babel/preset-env": "^7.10.0",
        "@babel/preset-react": "^7.10.0",
        "@babel/runtime": "^7.10.0",
        "@commitlint/cli": "^8.3.5",`,
  },
}

export const WithLayer: Story = {
  args: {
    type: 'inline',
    children: 'node -v',
  },
  render: (args) => (
    <Annotation type='layer' text='Layer 0'>
      <CodeSnippet {...args} />
      <Annotation type='layer' text='Layer 1'>
        <Layer level={1}>
          <CodeSnippet {...args} />
          <Annotation type='layer' text='Layer 2'>
            <Layer level={2}>
              <CodeSnippet {...args} />
            </Layer>
          </Annotation>
        </Layer>
      </Annotation>
    </Annotation>
  ),
}
