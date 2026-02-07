/// <reference types="vitest/config" />
import type * as Runtime from './wailsjs/runtime/runtime'

export type TRuntime = typeof Runtime

declare global {
  var runtime: TRuntime
}
