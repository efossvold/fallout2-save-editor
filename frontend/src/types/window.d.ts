// eslint-disable-next-line import/no-relative-packages
import type * as Runtime from '../../wailsjs/runtime'

export type TRuntime = typeof Runtime

declare global {
  interface Window {
    runtime: TRuntime
  }
}
