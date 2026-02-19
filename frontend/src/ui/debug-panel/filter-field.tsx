import { Button, Input } from '@headlessui/react'
import { clsx } from 'clsx'
import type { ChangeEventHandler, MouseEventHandler } from 'react'

export const FilterField = (p: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>
  onReset: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className="relative">
    <Input
      className={clsx(
        'w-full rounded-sm bg-gray-100 px-3 py-1 mt-1 mb-1 text-gray-800 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
      )}
      placeholder="Filter"
      value={p.value}
      onChange={p.onChange}
    />
    <Button
      className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-50 cursor-pointer"
      onClick={p.onReset}
    >
      x
    </Button>
  </div>
)
