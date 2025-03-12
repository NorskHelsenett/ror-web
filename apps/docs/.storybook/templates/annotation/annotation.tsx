import { Layers, OctagonAlert, FlaskConical } from 'lucide-react'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

import './annotation.css'

const icons = {
  'deprecation-notice': {
    icon: OctagonAlert,
    label: 'Deprecated',
  },
  layer: {
    icon: Layers,
    label: 'Layer',
  },
  experimental: {
    icon: FlaskConical,
    label: 'Experimental',
  },
}

interface AnnotationProps {
  /**
   * Optional class to be passed to the container node
   */
  className?: string
  /**
   * The type of annotation
   */
  type: keyof typeof icons
  /**
   * Provide a custom text be displayed in the annotation label, otherwise it uses a default label for the different types
   */
  text?: string
  /**
   * The content to be displayed in the annotation body
   */
  children: ReactNode
}

/**
 * Annotation can be used to signify some important context surrounding a component
 * It can be used to mark components as deprecated, experimental, or that they change depending on layer
 */
export function Annotation({ className, type, text, children }: AnnotationProps) {
  const Icon = icons[type].icon
  const label = text ?? icons[type].label

  const classes = clsx(className, 'ror-sb-annotation', {
    [`ror-sb-annotation--${type}`]: true,
  })

  return (
    <div className={classes}>
      <div className='ror-sb-annotation__label'>
        <Icon className='ror-sb-annotation__icon' />
        {label}
      </div>
      <div className='ror-sb-annotation__content'>{children}</div>
    </div>
  )
}
