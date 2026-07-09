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
        'mt-1 mb-1 w-full rounded-sm bg-gray-100 px-3 py-1 text-gray-800 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
      )}
      placeholder="Filter"
      value={p.value}
      onChange={p.handleChange}
    />
    <Button
      className="absolute top-1.5 right-2 cursor-pointer text-gray-400 hover:text-gray-50"
      onClick={p.handleReset}
    >
      x
    </Button>
  </div>
)
