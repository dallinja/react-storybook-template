/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/react'
import clsx from 'clsx'
import Fade from '../Fade/Fade'

export interface BackdropProps {
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
   * @default 'div'
   */
  component?: React.ElementType
  /**
   * The components used for each slot inside the Backdrop.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType
  }
  /**
   * The props used for each slot inside the Backdrop.
   * @default {}
   */
  componentsProps?: {
    root?: Record<string, any>
  }
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible?: boolean
  /**
   * If `true`, the component is shown.
   */
  open: boolean
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: number | { appear: number; enter: number; exit: number }
}

const Backdrop = React.forwardRef<HTMLElement, BackdropProps>(function Backdrop(props, ref) {
  const {
    children,
    component = 'div',
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    // @ts-ignore
    TransitionComponent = Fade,
    ...other
  } = props

  const ownerState = {
    ...props,
    component,
    invisible,
  }

  const classes = { root: '' }

  const Component = components.Root ?? component

  return (
    <TransitionComponent in={open} timeout={transitionDuration} {...other}>
      <Component
        aria-hidden
        css={root(props)}
        className={clsx(classes.root, className)}
        // ownerState={{ ...ownerState, ...componentsProps.root?.ownerState }}
        // classes={classes}
        ref={ref}
      >
        {children}
      </Component>
      {/* <BackdropRoot
        aria-hidden
        as={components.Root ?? component}
        className={clsx(classes.root, className)}
        ownerState={{ ...ownerState, ...componentsProps.root?.ownerState }}
        classes={classes}
        ref={ref}
      >
        {children}
      </BackdropRoot> */}
    </TransitionComponent>
  )
})

export default Backdrop

const root = (props: Pick<BackdropProps, 'invisible'>) => css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: ${props.invisible ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
  -webkit-tap-highlight-color: transparent;
`

// const BackdropRoot = styled('div', {
//   name: 'MuiBackdrop',
//   slot: 'Root',
//   overridesResolver: (props, styles) => {
//     const { ownerState } = props

//     return [styles.root, ownerState.invisible && styles.invisible]
//   },
// })(({ ownerState }) => ({
//   position: 'fixed',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   right: 0,
//   bottom: 0,
//   top: 0,
//   left: 0,
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   WebkitTapHighlightColor: 'transparent',
//   ...(ownerState.invisible && {
//     backgroundColor: 'transparent',
//   }),
// }))
