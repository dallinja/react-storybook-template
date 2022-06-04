import React from 'react'
import ThemeContext from '../ThemeContext'

type ThemeProviderProps = {
  /**
   * Your component tree.
   */
  children?: React.ReactNode
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: Record<string, any>
}

/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
