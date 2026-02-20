import { clsx } from 'clsx'
import type { PropsWithChildren } from 'react'

interface PanelHeaderProps {
  title: string
  color?: string
}

export const PanelHeader = (p: PanelHeaderProps) => (
  <p className={`${p.color ?? 'text-beige-500'} mb-0 uppercase`}>{p.title}</p>
)

export const Panel = ({
  children,
  bg,
  className = '',
}: PropsWithChildren<{ bg?: string; className?: string }>) => (
  <div className={clsx(bg ?? 'bg-gray-900', className, 'p-2 rounded-sm')}>{children}</div>
)
