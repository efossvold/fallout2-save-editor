import { useEffect, useState } from 'octane'

import { css } from '~/styled-system/css'
import { flex } from '~/styled-system/patterns'

import type { Toast } from './store'

import { AlertCircle, CheckmarkCircle } from '../icons'
import { useToasterStore } from './store'

interface ToastNotificationProps extends Toast {
  index: number
}

interface UseTransitionCtrlProps {
  toastDuration: number
  transitionDuration: number
  onAnimationComplete?: () => void
}

const useTransitionCtrl = ({
  toastDuration,
  transitionDuration,
  onAnimationComplete,
}: UseTransitionCtrlProps) => {
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false)
  const [isAnimationDone, setIsAnimationDone] = useState(false)

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined

    if (!shouldStartAnimation) {
      handler = setTimeout(() => {
        setShouldStartAnimation(true)
      }, toastDuration)
    }

    return () => {
      if (handler) {
        clearTimeout(handler)
      }
    }
  }, [toastDuration, shouldStartAnimation])

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined

    if (shouldStartAnimation) {
      handler = setTimeout(() => {
        setShouldStartAnimation(true)
        if (onAnimationComplete) {
          onAnimationComplete()
        }
      }, transitionDuration)
    }

    return () => {
      if (handler) {
        clearTimeout(handler)
      }
    }
  }, [transitionDuration, shouldStartAnimation, onAnimationComplete])

  return { shouldStartAnimation, setShouldStartAnimation, isAnimationDone, setIsAnimationDone }
}

export const ToastNotification = (p: ToastNotificationProps) => {
  const transitionDuration = 400
  const removeToast = useToasterStore(s => s.removeToast)
  const transition = useTransitionCtrl({
    toastDuration: p.duration,
    transitionDuration,
    onAnimationComplete: () => {
      removeToast(p.id)
    },
  })

  return (
    <div
      data-id={p.id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        transform: `translateY(-${p.offset}px)`,
        opacity: transition.shouldStartAnimation ? 0 : 1,
      }}
      className={flex({
        pos: 'absolute',
        maxW: '[280px]',
        bg: 'gray.50',
        color: 'gray.600',
        px: '3',
        py: '2',
        rounded: 'md',
        fs: 'md',
        boxShadow: '[3px 3px 8px 0px rgba(0,0,0,0.4)]',
        transitionProperty: '[transform, opacity]',
        transitionDuration: `[${transitionDuration}ms]`,
      })}
    >
      <div class={flex({ align: 'center', gap: '3' })}>
        {p.severity === 'success' && (
          <div className={css({ size: '[20px]' })}>
            <CheckmarkCircle className={css({ fill: 'green.600' })} />
          </div>
        )}
        {p.severity === 'error' && (
          <div className={css({ size: '[20px]' })}>
            <AlertCircle className={css({ fill: 'red.500' })} />
          </div>
        )}
        <div>{p.message}</div>
      </div>
    </div>
  )
}
