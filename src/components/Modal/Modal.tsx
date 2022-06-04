/** @jsx jsx */
import React, { useCallback } from 'react'
import Portal from '../Portal/Portal'
import useForkRef from '../../utils/useForkRef'
import isDOMElementName from '../../utils/isDOMElementName'
import clsx from 'clsx'
import Backdrop from '../Backdrop/Backdrop'
import { css, jsx } from '@emotion/react'
import { TransitionProps } from 'react-transition-group/Transition'

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   */
  BackdropComponent?: React.ElementType
  /**
   * Props applied to the backdrop element.
   */
  BackdropProps?: Record<string, any>
  /**
   * A single child content element.
   */
  children: React.ReactElement
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Record<string, string>
  /**
   * @ignore
   */
  className?: string
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition?: boolean
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * @default 'div'
   */
  component?: React.ElementType
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType
  }
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  componentsProps?: {
    root?: Record<string, any>
  }
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: HTMLElement | (() => HTMLElement)
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus?: boolean
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus?: boolean
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus?: boolean
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock?: boolean
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop?: boolean
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted?: boolean
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: (event: unknown, reason: 'escapeKeyDown' | 'backdropClick') => void
  /**
   * @ignore
   */
  onKeyDown?: () => void
  /**
   * If `true`, the component is shown.
   */
  open: boolean
}

/**
 * The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or
 * whatever else. If you are creating a modal dialog, you probably want to use the Dialog component
 * rather than directly using Modal. Modal is a lower-level construct that is leveraged by the
 * following components: Dialog
 */
const Modal = React.forwardRef<HTMLElement, ModalProps>(function Modal(props, ref) {
  const {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    children,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = 'div',
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    // private
    // @ts-ignore: Property does not exist on type
    // eslint-disable-next-line react/prop-types
    // manager = defaultManager,
    onClose,
    onKeyDown,
    open,
    /* eslint-disable react/prop-types */
    // @ts-ignore: Property does not exist on type
    theme,
    // @ts-ignore: Property does not exist on type
    onTransitionEnter,
    // @ts-ignore: Property does not exist on type
    onTransitionExited,
    ...other
  } = props

  // REFS

  const modal = React.useRef({})
  const mountNodeRef = React.useRef(null)
  const modalRef = React.useRef(null)

  // STATE

  const [exited, setExited] = React.useState(true)

  //

  const handleRef = useForkRef(modalRef, ref)
  const childHasTransition = getChildHasTransition(props)

  // const getDoc = () => ownerDocument(mountNodeRef.current)
  const getDoc = () => document
  const getModal = () => {
    modal.current.modalRef = modalRef.current
    modal.current.mountNode = mountNodeRef.current
    return modal.current
  }

  const handleMounted = () => {
    // manager.mount(getModal(), { disableScrollLock })

    // Fix a bug on Chrome where the scroll isn't initially 0.
    modalRef.current.scrollTop = 0
  }

  // const handleOpen = useCallback(() => {
  //   const resolvedContainer = getContainer(container) || getDoc().body

  //   // manager.add(getModal(), resolvedContainer)

  //   // The element was already mounted.
  //   if (modalRef.current) {
  //     handleMounted()
  //   }
  // })

  // const isTopModal = React.useCallback(() => manager.isTopModal(getModal()), [manager])

  // const handlePortalRef = useCallback((node) => {
  //   mountNodeRef.current = node

  //   if (!node) {
  //     return
  //   }

  //   if (open && isTopModal()) {
  //   if (open) {
  //     handleMounted()
  //   } else {
  //     // ariaHidden(modalRef.current, true)
  //   }
  // })

  // const handleClose = React.useCallback(() => {
  //   // manager.remove(getModal())
  // // }, [manager])
  // })

  // React.useEffect(() => {
  //   return () => {
  //     handleClose()
  //   }
  // }, [handleClose])

  // React.useEffect(() => {
  //   if (open) {
  //     handleOpen()
  //   } else if (!childHasTransition || !closeAfterTransition) {
  //     handleClose()
  //   }
  // }, [open, handleClose, childHasTransition, closeAfterTransition, handleOpen])

  const ownerState = {
    ...props,
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted,
  }

  // const classes = useUtilityClasses(ownerState)
  const classes = { root: '' }

  console.log('open: ', open)
  if (!keepMounted && !open && (!childHasTransition || exited)) {
    return null
  }

  const handleEnter = () => {
    setExited(false)

    if (onTransitionEnter) {
      onTransitionEnter()
    }
  }

  const handleExited = () => {
    setExited(true)

    if (onTransitionExited) {
      onTransitionExited()
    }

    if (closeAfterTransition) {
      // handleClose()
    }
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('here')
    if (event.target !== event.currentTarget) {
      console.log('here2')
      return
    }

    if (onClose) {
      onClose(event, 'backdropClick')
    }
  }

  const handleKeyDown = (event) => {
    if (onKeyDown) {
      onKeyDown(event)
    }

    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    // if (event.key !== 'Escape' || !isTopModal()) {
    //   return
    // }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation()

      if (onClose) {
        onClose(event, 'escapeKeyDown')
      }
    }
  }

  // Modify child props

  const childProps: Partial<TransitionProps> = {}
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1'
  }

  // If child is a Transition like component, we need to modify it's props to also call our handlers
  if (childHasTransition) {
    childProps.onEnter = (...args) => {
      handleEnter()
      if (children.props.onEnter) {
        children.props.onEnter(...args)
      }
    }
    childProps.onExited = (...args) => {
      handleExited()
      if (children.props.onExited) {
        children.props.onExited(...args)
      }
    }
  }

  // DOM

  const Root = components.Root || ModalRoot || component
  const rootProps = componentsProps.root || {}
  return (
    <Portal
      // ref={handlePortalRef}
      container={container}
      disablePortal={disablePortal}
    >
      {/*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */}
      <Root
        role="presentation"
        {...rootProps}
        // {...(!isDOMElementName(Root) && {
        //   as: component,
        //   ownerState: { ...ownerState, ...rootProps.ownerState },
        //   theme,
        // })}
        {...other}
        ref={handleRef}
        onKeyDown={handleKeyDown}
        className={clsx(classes.root, rootProps.className, className)}
      >
        {!hideBackdrop && BackdropComponent ? (
          <BackdropComponent
            aria-hidden
            open={open}
            onClick={handleBackdropClick}
            {...BackdropProps}
          />
        ) : null}
        {/* <TrapFocus
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </TrapFocus> */}
        {/* {children} */}
        {React.cloneElement(children, childProps)}
      </Root>
    </Portal>
  )
})

export default Modal

function getContainer(container: ModalProps['container']) {
  return typeof container === 'function' ? container() : container
}

function getChildHasTransition(props: ModalProps) {
  return props.children ? Object.prototype.hasOwnProperty.call(props.children.props, 'in') : false
}

const ModalRoot = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    css={css`
      position: fixed;
      z-index: 1100;
      right: 0;
      bottom: 0;
      top: 0;
      left: 0;
    `}
    {...props}
  />
))

const ModalBackdrop = (props) => (
  <Backdrop
    css={css`
      z-index: -1;
    `}
    {...props}
  />
)
