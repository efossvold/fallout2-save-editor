import type * as Runtime from './wailsjs/runtime/runtime'

export type TRuntime = typeof Runtime

declare global {
  // eslint-disable-next-line no-var
  var runtime: TRuntime
}
