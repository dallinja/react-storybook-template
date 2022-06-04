/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

interface DialogActionsProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean
}

const DialogActions = React.forwardRef<HTMLParagraphElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    const { className, disableSpacing, ...other } = props

    return (
      <div
        css={rootStyle({ disableSpacing })}
        // className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      />
    )
  },
)

export default DialogActions

// STYLES

const rootStyle = ({ disableSpacing }: Pick<DialogActionsProps, 'disableSpacing'>) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  flex: '0 0 auto',
  ...(!disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8,
    },
  }),
})
