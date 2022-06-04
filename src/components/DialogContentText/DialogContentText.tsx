/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

interface DialogContentTextProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
}

const DialogContentText = React.forwardRef<HTMLParagraphElement, DialogContentTextProps>(
  function DialogContentText(props, ref) {
    const { className, ...other } = props

    return (
      <Typography
        component="p"
        // className={clsx(classes.root, className)}
        ref={ref}
        variant="body1"
        {...other}
      />
    )
  },
)

export default DialogContentText

interface TypographyProps extends React.ComponentPropsWithoutRef<'p'> {
  component?: string
  variant?: string
  children?: React.ReactNode
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>((props, ref) => {
  const { component = 'p', variant = 'p', children, ...other } = props
  const Component = component
  return (
    <Component ref={ref} css={{ margin: 0 }} {...other}>
      {children}
    </Component>
  )
})

// STYLES
