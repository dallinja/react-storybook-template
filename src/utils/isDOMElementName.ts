import React from 'react'

/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isDOMElementName(element: React.ElementType) {
  return typeof element === 'string'
}

export default isDOMElementName
