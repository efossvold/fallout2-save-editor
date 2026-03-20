import type * as Runtime from './wailsjs/runtime/runtime'

declare global {
  var runtime: TRuntime
}

export type TRuntime = typeof Runtime
