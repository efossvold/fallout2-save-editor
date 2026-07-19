import type { InputProps } from '@headlessui/react'

import { Input } from '@headlessui/react'
import { clsx } from 'cnfast'

export const IInput = ({ className, ...rest }: InputProps) => (
  <Input
    className={clsx(
      className,
      'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 text-white mt-3 px-3 py-1.5 rounded-sm bg-gray-600 w-full block',
    )}
    {...rest}
  />
)
