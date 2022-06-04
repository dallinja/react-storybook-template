/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

interface DialogContentProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers?: boolean
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  props,
  ref,
) {
  const { children, dividers, ...other } = props
  return (
    <div ref={ref} css={rootStyles({ dividers })} {...other}>
      {children}
    </div>
  )
})

export default DialogContent

const rootStyles = ({ dividers }: Pick<DialogContentProps, 'dividers'>) => ({
  flex: '1 1 auto',
  // Add iOS momentum scrolling for iOS < 13.0
  // WebkitOverflowScrolling: 'touch',
  // overflowY: 'auto',
  padding: '20px 24px',
  ...(dividers
    ? {
        padding: '16px 24px',
        borderTop: `1px solid #e4e4e4`,
        borderBottom: `1px solid #e4e4e4`,
      }
    : {
        // [`.${dialogTitleClasses.root} + &`]: {
        //   paddingTop: 0,
        // },
      }),
})
