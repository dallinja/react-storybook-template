import deepmerge from '@/utils/deepmerge'
import { darken, getContrastRatio, lighten } from '@/utils/colorManipulator'
import { common, grey, red, orange, blue, green, purple } from '@/colors'
import { Color, CommonColors } from '@/colors/types'

/**
 * Light palette defaults
 */
export const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white,
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
}

/**
 * Dark palette defaults
 */
export const dark = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212',
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
}

function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5

  if (!intent[direction]) {
    if (Object.prototype.hasOwnProperty.call(intent, shade)) {
      intent[direction] = intent[shade]
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight)
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark)
    }
  }
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue[20],
      light: blue[5],
      dark: blue[40],
    }
  }
  return {
    main: blue[60],
    light: blue[40],
    dark: blue[80],
  }
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple[20],
      light: purple[5],
      dark: purple[40],
    }
  }
  return {
    main: purple[50],
    light: purple[30],
    dark: purple[70],
  }
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red[50],
      light: red[30],
      dark: red[70],
    }
  }
  return {
    main: red[70],
    light: red[40],
    dark: red[80],
  }
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue[40],
      light: blue[30],
      dark: blue[70],
    }
  }
  return {
    main: blue[20],
    light: blue[10],
    dark: blue[30],
  }
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green[40],
      light: green[30],
      dark: green[70],
    }
  }
  return {
    main: green[80],
    light: green[50],
    dark: green[90],
  }
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange[40],
      light: orange[30],
      dark: orange[70],
    }
  }
  return {
    main: orange[70],
    light: orange[50],
    dark: orange[90],
  }
}

export interface SimplePaletteColorOptions {
  light?: string
  main: string
  dark?: string
  contrastText?: string
}

export interface TypeText {
  primary: string
  secondary: string
  disabled: string
}

export interface TypeAction {
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  selectedOpacity: number
  disabled: string
  disabledOpacity: number
  disabledBackground: string
  focus: string
  focusOpacity: number
  activatedOpacity: number
}

export interface TypeBackground {
  default: string
  paper: string
}

export type PaletteColorOptions = SimplePaletteColorOptions | Partial<Color>

export type PaletteOptions = {
  primary?: PaletteColorOptions
  secondary?: PaletteColorOptions
  error?: PaletteColorOptions
  warning?: PaletteColorOptions
  info?: PaletteColorOptions
  success?: PaletteColorOptions
  mode?: 'light' | 'dark'
  tonalOffset?: number | { light: number; dark: number }
  contrastThreshold?: number
  common?: Partial<CommonColors>
  grey?: Partial<Color>
  text?: Partial<TypeText>
  divider?: string
  action?: Partial<TypeAction>
  background?: Partial<TypeBackground>
  getContrastText?: (background: string) => string
}

export default function createPalette(paletteInput: PaletteOptions = {}) {
  const { mode = 'light', contrastThreshold = 3, tonalOffset = 0.2, ...other } = paletteInput

  const primary = paletteInput.primary || getDefaultPrimary(mode)
  const secondary = paletteInput.secondary || getDefaultSecondary(mode)
  const error = paletteInput.error || getDefaultError(mode)
  const info = paletteInput.info || getDefaultInfo(mode)
  const success = paletteInput.success || getDefaultSuccess(mode)
  const warning = paletteInput.warning || getDefaultWarning(mode)

  // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
  function getContrastText(background: string) {
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText)
      if (contrast < 3) {
        console.error(
          [
            `MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join('\n'),
        )
      }
    }

    return contrastText
  }

  const augmentColor = ({ color, name, mainShade = 500, lightShade = 300, darkShade = 700 }) => {
    color = { ...color }
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade]
    }

    addLightOrDark(color, 'light', lightShade, tonalOffset)
    addLightOrDark(color, 'dark', darkShade, tonalOffset)
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main)
    }

    return color
  }

  const modes = { dark, light }

  if (process.env.NODE_ENV !== 'production') {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`)
    }
  }

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common: { ...common }, // prevent mutable object.
      // The palette mode, can be light or dark.
      mode,
      // The colors used to represent primary interface elements for a user.
      primary: augmentColor({ color: primary, name: 'primary' }),
      // The colors used to represent secondary interface elements for a user.
      secondary: augmentColor({
        color: secondary,
        name: 'secondary',
        mainShade: 'A400',
        lightShade: 'A200',
        darkShade: 'A700',
      }),
      // The colors used to represent interface elements that the user should be made aware of.
      error: augmentColor({ color: error, name: 'error' }),
      // The colors used to represent potentially dangerous actions or important messages.
      warning: augmentColor({ color: warning, name: 'warning' }),
      // The colors used to present information to the user that is neutral and not necessarily important.
      info: augmentColor({ color: info, name: 'info' }),
      // The colors used to indicate the successful completion of an action that user triggered.
      success: augmentColor({ color: success, name: 'success' }),
      // The grey colors.
      grey,
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold,
      // Takes a background color and returns the text color that maximizes the contrast.
      getContrastText,
      // Generate a rich color object.
      augmentColor,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset,
      // The light and dark mode object.
      ...modes[mode],
    },
    other,
  )

  return paletteOutput
}
