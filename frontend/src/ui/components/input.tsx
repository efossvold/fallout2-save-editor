import type { InputProps } from '@headlessui/react'
import { Input } from '@headlessui/react'
import { clsx } from 'clsx'

export const IInput = ({ className, ...rest }: InputProps) => (
  <Input
    className={clsx(
      className,
      'mt-3 block w-full rounded-sm bg-gray-600 px-3 py-1.5  text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
    )}
    {...rest}
  />
)
