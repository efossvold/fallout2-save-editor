import type { MouseEventHandler } from 'react'

import { Button } from '@headlessui/react'

import { Checkbox as CheckboxUnchecked, CheckboxChecked } from '../icons'

interface SimpleCheckboxProps {
  label: string
  value: boolean
  handleChange?: MouseEventHandler<HTMLButtonElement>
}

export const SimpleCheckbox = (p: SimpleCheckboxProps) => {
  const CheckBox = p.value ? CheckboxChecked : CheckboxUnchecked

  return (
    <Button className="flex cursor-pointer items-center" onClick={p.handleChange}>
      <CheckBox className="mr-1" />
      <p className="text-xs text-gray-500">{p.label}</p>
    </Button>
  )
}
