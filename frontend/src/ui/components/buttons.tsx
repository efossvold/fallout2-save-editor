import type { ButtonProps } from '@headlessui/react'

import { Button } from '@headlessui/react'
import { cn } from 'cnfast'

interface ModalButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary'
}

export const ModalButton = ({ children, className, variant, ...rest }: ModalButtonProps) => (
  <Button
    className={cn(
      'cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 font-semibold text-white',
      'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
      'data-hover:bg-gray-500',
      'data-disabled:cursor-default data-disabled:bg-gray-300',
      variant !== 'primary' ? 'bg-gray-600' : 'bg-gray-100 text-gray-900 data-hover:bg-gray-200',
      className,
    )}
    {...rest}
  >
    {children}
  </Button>
)

// import { tv } from 'tailwind-variants'

// const btnStyle = tv({
//   base: clsx(
//     'cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 font-semibold text-white',
//     'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
//     'data-hover:bg-gray-500',
//     'data-disabled:cursor-default data-disabled:bg-gray-300',
//   ),
//   variants: {
//     color: {
//       primary: 'bg-gray-600',
//       secondary: 'bg-gray-100 text-gray-900 data-hover:bg-gray-200',
//     },
//     size: {
//       sm: 'text-sm',
//       md: 'text-base',
//       lg: 'text-lg',
//     },
//   },
//   defaultVariants: {
//     color: 'primary',
//   },
// })

// interface IButtonProps extends ButtonProps {
//   size?: keyof (typeof btnStyle)['variants']['size']
//   color?: keyof (typeof btnStyle)['variants']['color']
// }

// export const IButton = ({ children, className, size, color, ...rest }: IButtonProps) => (
//   <Button className={clsx(btnStyle({ size, color }), className)} {...rest}>
//     {children}
//   </Button>
// )
