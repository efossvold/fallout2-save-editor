import type { ChangeEventHandler, MouseEventHandler } from 'react'

import { Button, Input } from '@headlessui/react'
import { clsx } from 'cnfast'

export const FilterField = (p: {
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>
  handleReset: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className="relative">
    <Input
      className={clsx(
        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 text-gray-800 mb-1 mt-1 px-3 py-1 rounded-sm bg-gray-100 w-full',
      )}
      placeholder="Filter"
      value={p.value}
      onChange={p.handleChange}
    />
    <Button
      className="text-gray-400 cursor-pointer right-2 top-1.5 absolute hover:text-gray-50"
      onClick={p.handleReset}
    >
      x
    </Button>
  </div>
)
