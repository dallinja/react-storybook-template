/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'
import DialogContext from '../Dialog/DialogContext'

interface DialogTitleProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
  /**
   * @ignore
   */
  id?: string
}

const DialogTitle = React.forwardRef<HTMLParagraphElement, DialogTitleProps>(function DialogTitle(
  props,
  ref,
) {
  const { className, id: idProp, ...other } = props

  const { titleId: id = idProp } = React.useContext(DialogContext)

  return (
    <Typography
      css={rootStyle}
      component="h2"
      // className={clsx(classes.root, className)}
      ref={ref}
      variant="h6"
      id={id}
      {...other}
    />
  )
})

export default DialogTitle

interface TypographyProps extends React.ComponentPropsWithoutRef<'p'> {
  component?: string
  variant?: string
  children?: React.ReactNode
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>((props, ref) => {
  const { component = 'p', variant = 'p', children, ...other } = props
  const Component = component
  return (
    <Component ref={ref} css={{ fontSize: 18, fontWeight: 700, margin: 0 }} {...other}>
      {children}
    </Component>
  )
})

// STYLES

const rootStyle = css`
  padding: 16px 24px;
  flex: 0 0 auto;
`
