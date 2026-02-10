import type { ButtonProps } from '@headlessui/react'
import { Button } from '@headlessui/react'
import { clsx } from 'clsx'

export const IButton = ({ children, className, ...rest }: ButtonProps) => (
  <Button
    className={clsx(
      className,
      'rounded-md bg-gray-700 px-3 py-1.5 font-semibold text-white cursor-pointer',
      'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
      'data-hover:bg-gray-600',
      'data-open:bg-gray-700',
    )}
    {...rest}
  >
    {children}
  </Button>
)
