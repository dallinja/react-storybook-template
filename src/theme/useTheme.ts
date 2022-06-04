import React from 'react'
import createTheme from './createTheme'
import ThemeContext from './ThemeContext'

export const neighborDefaultTheme = createTheme()

/**
 * This hook returns the theme object to be used. If not wrapped in a ThemeProvider, it uses the
 * default Neighbor theme.
 * @param defaultTheme Accepts a theme object
 * @returns A theme for the component library
 */
const useTheme = (defaultTheme = neighborDefaultTheme) => {
  const theme = React.useContext(ThemeContext)
  return theme || defaultTheme
}

export default useTheme
