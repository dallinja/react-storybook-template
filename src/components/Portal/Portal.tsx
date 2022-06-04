import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import assignRef from '../../utils/assignRef'
import useForkRef from '../../utils/useForkRef'

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: HTMLElement | (() => HTMLElement)
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = React.forwardRef<HTMLElement, PortalProps>(function Portal(props, ref) {
  // PROPS

  const { children, container, disablePortal = false } = props

  // REFS

  const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref)

  // STATE

  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null)

  // EFFECTS

  useEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body)
    }
  }, [container, disablePortal])

  useEffect(() => {
    if (mountNode && !disablePortal) {
      assignRef(ref, mountNode)
      return () => {
        assignRef(ref, null)
      }
    }

    return undefined
  }, [ref, mountNode, disablePortal])

  // DOM

  if (disablePortal) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: handleRef,
      })
    }
    return children
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
})

export default Portal

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container
}
