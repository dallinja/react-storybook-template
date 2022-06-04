/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'
import shadows from '../../theme/shadows'

export interface PaperProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * @default 'div'
   */
  component?: React.ElementType
  /**
   * Shadow depth. It accepts values between 0 (none) and 24 (high) inclusive.
   * @default 1
   */
  elevation?: number
  /**
   * If true, rounded corners are disabled.
   * @default false
   */
  square?: boolean
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant?: 'elevation' | 'outlined'
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(function Paper(props, ref) {
  const {
    children,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...otherProps
  } = props
  const Root = component
  return (
    <Root ref={ref} {...otherProps} css={rootStyle({ square, variant, elevation })}>
      {children}
    </Root>
  )
})

export default Paper

const rootStyle = ({
  square,
  variant,
  elevation,
}: Required<Pick<PaperProps, 'square' | 'variant' | 'elevation'>>) => css`
  background-color: #fff;
  color: currentColor;
  transition: all 0.2s ease-in-out;
  ${!square ? 'border-radius: 12px;' : ''}
  ${variant === 'outlined' ? 'border: 1px solid rgba(0,0,0,0.12);' : ''}
  ${variant === 'elevation' ? `box-shadow: ${shadows[elevation]};` : ''}
`

// const shadows = [
//   'none',
//   '2px 2px 2px 0 rgba(102,123,139,0.16)',
//   '4px 4px 4px 0px rgba(102,123,139,0.16)',
//   '6px 6px 6px 0px rgba(102,123,139,0.16)',
//   '12px 12px 12px 0 rgba(102,123,139,0.16)',
//   '14px 14px 32px 0 rgba(102,123,139,0.16)',
// ]
