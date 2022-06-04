import React from 'react'
import { Transition } from 'react-transition-group'
import { EndHandler } from 'react-transition-group/Transition'
import useForkRef from '../../utils/useForkRef'

const styles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

export type FadeProps = {
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener?: EndHandler<HTMLElement | undefined>
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean
  /**
   * A single child content element.
   */
  children: React.ReactElement
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: { enter: string; exit: string } | string
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean
  /**
   * @ignore
   */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  /**
   * @ignore
   */
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void
  /**
   * @ignore
   */
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void
  /**
   * @ignore
   */
  onExit?: (node: HTMLElement) => void
  /**
   * @ignore
   */
  onExited?: (node: HTMLElement) => void
  /**
   * @ignore
   */
  onExiting?: (node: HTMLElement) => void
  /**
   * @ignore
   */
  style?: Record<string, any>
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout?: number | { appear?: number; enter?: number; exit?: number }
}

const Fade = React.forwardRef<HTMLElement, FadeProps>(function Fade(props, ref) {
  // const nodeRef = React.useRef(null)
  // const [inProp, setInProp] = React.useState(false)
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp = false,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = 225,
    ...other
  } = props

  const nodeRef = React.useRef(null)
  const foreignRef = useForkRef(children.ref, ref)
  const handleRef = useForkRef(nodeRef, foreignRef)

  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node)
      } else {
        callback(node, maybeIsAppearing)
      }
    }
  }

  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    console.log('entering!!')
    if (onEntering) {
      onEntering(node, isAppearing)
    }
  })

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    console.log('enter!!')
    reflow(node) // So the animation always start from the start.

    // const transitionProps = getTransitionProps(
    //   { style, timeout, easing },
    //   {
    //     mode: 'enter',
    //   },
    // )

    // const transitionStyle = theme.transitions.create('opacity', transitionProps)

    // node.style.webkitTransition = transitionStyle
    // node.style.transition = transitionStyle

    if (onEnter) {
      onEnter(node, isAppearing)
    }
  })

  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    console.log('entered!!')
    if (onEntered) {
      onEntered(node, isAppearing)
    }
  })

  const handleExiting = normalizedTransitionCallback(onExiting)

  const handleExit = normalizedTransitionCallback((node) => {
    // const transitionProps = getTransitionProps(
    //   { style, timeout, easing },
    //   {
    //     mode: 'exit',
    //   },
    // )

    // node.style.webkitTransition = 'opacity 1225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    // node.style.transition = 'opacity 1225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'

    if (onExit) {
      onExit(node)
    }
  })

  const handleExited = normalizedTransitionCallback(onExited)

  const handleAddEndListener = (next) => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next)
    }
  }

  // React.useEffect(() => {
  //   setInProp(!!open)
  // }, [open])
  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      timeout={timeout}
      {...other}
    >
      {(state) => {
        console.log('state: ', state)

        return React.cloneElement(children, {
          style: {
            opacity: 0,
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            ...styles[state],
            ...style,
            ...children.props.style,
          },
          ref: handleRef,
        })
      }}
    </Transition>
  )
})

export default Fade

export const reflow = (node: Element) => node.scrollTop

interface ComponentProps {
  easing: string | { enter?: string; exit?: string } | undefined
  style: React.CSSProperties | undefined
  timeout: number | { enter?: number; exit?: number }
}

interface Options {
  mode: 'enter' | 'exit'
}

interface TransitionProps {
  duration: string | number
  easing: string | undefined
  delay: string | undefined
}

export function getTransitionProps(props: ComponentProps, options: Options): TransitionProps {
  const { timeout, easing, style = {} } = props

  return {
    duration:
      style.transitionDuration ??
      (typeof timeout === 'number' ? timeout : timeout[options.mode] || 0),
    easing:
      style.transitionTimingFunction ??
      (typeof easing === 'object' ? easing[options.mode] : easing),
    delay: style.transitionDelay,
  }
}
