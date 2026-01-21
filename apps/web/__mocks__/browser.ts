import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Guard access to `module` because referencing an undeclared identifier
// throws a ReferenceError in ESM/browser environments. Use typeof to
// safely check if HMR is available before calling dispose.
if (typeof module !== 'undefined') {
  const modWithHot = module as unknown as { hot?: { dispose?: (fn: () => void) => void } }
  if (modWithHot.hot?.dispose) {
    modWithHot.hot.dispose(() => {
      worker.stop() // Stop the worker when the module is replaced (HMR)
    })
  }
}
