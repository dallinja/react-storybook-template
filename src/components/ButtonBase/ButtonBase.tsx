/** @jsx jsx */
import useForkRef from '../../utils/useForkRef'
import { jsx } from '@emotion/react'
import React from 'react'
import clsx from 'clsx'

const buttonBaseClasses = {
  disabled: 'button-disabled',
}

export interface ButtonBaseProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action?: string
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple?: boolean
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName?: string
  /**
   * Pass in a href
   */
  href?: string
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent?: React.ElementType
  /**
   * @ignore
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onContextMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onDragLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible?: (event: React.FocusEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onTouchMove?: (event: React.TouchEvent<HTMLButtonElement>) => void
  /**
   * @ignore
   */
  onTouchStart?: (event: React.TouchEvent<HTMLButtonElement>) => void
  /**
   * @default 0
   */
  tabIndex?: number
  /**
   * This prop is only if you pass in a react-router `Link` component as the `LinkComponent` prop
   */
  to?: string
  /**
   * A ref that points to the `TouchRipple` element.
   */
  // touchRippleRef: PropTypes.oneOfType([
  //   PropTypes.func,
  //   PropTypes.shape({
  //     current: PropTypes.shape({
  //       pulsate: PropTypes.func.isRequired,
  //       start: PropTypes.func.isRequired,
  //       stop: PropTypes.func.isRequired,
  //     }),
  //   }),
  // ]),
  /**
   * @ignore
   */
  type?: 'button' | 'reset' | 'submit'
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(function ButtonBase(
  props,
  ref,
) {
  const {
    action,
    // centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    // disableRipple = false,
    // disableTouchRipple = false,
    // focusRipple = false,
    focusVisibleClassName,
    LinkComponent = 'a',
    // onBlur,
    // onClick,
    // onContextMenu,
    // onDragLeave,
    // onFocus,
    // onFocusVisible,
    // onKeyDown,
    // onKeyUp,
    // onMouseDown,
    // onMouseLeave,
    // onMouseUp,
    // onTouchEnd,
    // onTouchMove,
    // onTouchStart,
    tabIndex = 0,
    type,
    ...other
  } = props

  // REFS

  const buttonRef = React.useRef(null)

  // DOM

  let ButtonBaseComponent = component

  if (ButtonBaseComponent === 'button' && (other.href || other.to)) {
    ButtonBaseComponent = LinkComponent
  }

  const buttonProps: Partial<ButtonBaseProps> = {}
  if (ButtonBaseComponent === 'button') {
    buttonProps.type = type === undefined ? 'button' : type
    buttonProps.disabled = disabled
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = 'button'
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled
    }
  }

  // const handleOwnRef = useForkRef(focusVisibleRef, buttonRef)
  // const handleRef = useForkRef(ref, handleOwnRef)
  const handleRef = useForkRef(ref, buttonRef)

  return (
    <ButtonBaseComponent
      className={clsx(className, { 'button-disabled': disabled })}
      css={rootStyles}
      // ownerState={ownerState}
      // onBlur={handleBlur}
      // onClick={onClick}
      // onContextMenu={handleContextMenu}
      // onFocus={handleFocus}
      // onKeyDown={handleKeyDown}
      // onKeyUp={handleKeyUp}
      // onMouseDown={handleMouseDown}
      // onMouseLeave={handleMouseLeave}
      // onMouseUp={handleMouseUp}
      // onDragLeave={handleDragLeave}
      // onTouchEnd={handleTouchEnd}
      // onTouchMove={handleTouchMove}
      // onTouchStart={handleTouchStart}
      ref={handleRef}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
      {...buttonProps}
      {...other}
    >
      {children}
    </ButtonBaseComponent>
  )
})

export default ButtonBase

const rootStyles = {
  fontSize: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent', // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0, // Remove the margin in Safari
  borderRadius: 0,
  padding: 0, // Remove the padding in Firefox
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  MozAppearance: 'none', // Reset
  WebkitAppearance: 'none', // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
  '&::-moz-focus-inner': {
    borderStyle: 'none', // Remove Firefox dotted outline.
  },
  [`&.${buttonBaseClasses.disabled}`]: {
    pointerEvents: 'none', // Disable link interactions
    cursor: 'default',
  },
  '@media print': {
    colorAdjust: 'exact',
  },
}
