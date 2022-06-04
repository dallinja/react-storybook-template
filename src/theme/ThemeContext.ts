import React from 'react'
const ThemeContext = React.createContext<Record<string, any> | null>(null)

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeContext'
}

export default ThemeContext
