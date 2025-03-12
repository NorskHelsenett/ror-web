import type { Preview } from '@storybook/react'
import '@ror/styles/css/index.css'
import './global-styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
