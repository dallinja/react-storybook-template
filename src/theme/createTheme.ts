import createSpacing from './createSpacing'
import createShape, { ShapeOptions } from './createShape'
import shadowsDefault from './shadows'
import createZIndex, { ZIndexOptions } from './createZIndex'
import createBreakpoints, { BreakpointsOptions } from './createBreakpoints'
import createTypography, { TypographyOptions } from './createTypography'
import createTransitions, { TransitionsOptions } from './createTransitions'
import createPalette, { PaletteOptions } from './createPalette'

type ThemeOptions = {
  breakpoints?: BreakpointsOptions<Record<string, number>>
  // components?: ComponentsOptions
  direction?: string
  palette?: PaletteOptions
  shadows?: string[]
  shape?: ShapeOptions
  spacing?: number
  transitions?: TransitionsOptions
  typography?: TypographyOptions
  zIndex?: ZIndexOptions
}

function createTheme(options: ThemeOptions = {}) {
  const breakpoints = createBreakpoints(options.breakpoints)
  // const components = createComponents(options.components)
  const direction = options.direction || 'ltr'
  const palette = createPalette(options.palette)
  const shadows = options.shadows || shadowsDefault
  const shape = createShape(options.shape)
  const spacing = createSpacing(options.spacing)
  const transitions = createTransitions(options.transitions)
  const typography = createTypography(options.typography)
  const zIndex = createZIndex(options.zIndex)

  return {
    breakpoints,
    // components,
    direction,
    palette,
    shadows,
    shape,
    spacing,
    transitions,
    typography,
    zIndex,
  }
}

export default createTheme
