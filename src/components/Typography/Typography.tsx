/** @jsx jsx */
import useTheme from '@/theme/useTheme'
import { jsx } from '@emotion/react'
import React from 'react'

type Variant =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'

type TypographyProps = {
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  /**
   * The content of the component.
   */
  children: React.ReactNode
  /**
   * @ignore
   */
  className: string
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: React.ElementType
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: boolean
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: boolean
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: boolean
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: Variant
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: Record<Variant, string>
}

const defaultVariantMapping: Partial<Record<Variant, string>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p',
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(function Typography(props, ref) {
  const theme = useTheme()
  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props

  const ownerState = {
    ...props,
    align,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping,
  }

  const Component = component || variantMapping[variant] || defaultVariantMapping[variant] || 'span'
  return (
    <Component
      ref={ref}
      css={rootStyles({ theme, ownerState })}
      ownerState={ownerState}
      className={className}
      {...other}
    />
  )
})

export default Typography

export const rootStyles = ({ theme, ownerState }) => ({
  margin: 0,
  ...(ownerState.variant && theme.typography[ownerState.variant]),
  ...(ownerState.align !== 'inherit' && {
    textAlign: ownerState.align,
  }),
  ...(ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(ownerState.gutterBottom && {
    marginBottom: '0.35em',
  }),
  ...(ownerState.paragraph && {
    marginBottom: 16,
  }),
})
