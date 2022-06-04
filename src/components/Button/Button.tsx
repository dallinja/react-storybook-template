/** @jsx jsx */
import { jsx } from '@emotion/react'
import { blue, grey, purple } from '../../colors'
import React from 'react'
import ButtonBase from '../ButtonBase'
import shadows from '../../theme/shadows'

// TODO: get rid of all this
const buttonClasses = {
  focusVisible: 'button-focus-visible',
  disabled: 'button-disabled',
}

type ThemeProps = {
  typography: {
    button: {
      fontFamily: string
      fontWeight: 500
      fontSIze: string
      lineHeight: 1.75
      letterSpacing: string
      textTransform: string
    }
    pxToRem: (px: number) => string
  }
  shape: {
    borderRadius: number
  }
  transitions: {
    create: (attr: string[], { duration }: { duration: number }) => string
    duration: {
      short: number
    }
  }
  palette: {
    primary: {
      main: string
      dark: string
      alpha: string
    }
    secondary: {
      main: string
      dark: string
      alpha: string
    }
    text: {
      primary: string
    }
    action: {
      hoverOpacity: number
      disabledBackground: string
      disabled: string
    }
  }
}

const theme: ThemeProps = {
  typography: {
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSIze: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    pxToRem: (px: number) => `${px / 16}rem`,
  },
  shape: {
    borderRadius: 6,
  },
  transitions: {
    create: (attr, { duration }) => attr.map((a) => `${a} ${duration / 1000}s`).join(','),
    duration: {
      short: 200,
    },
  },
  palette: {
    primary: {
      main: blue[70],
      dark: blue[90],
      alpha: blue[10],
    },
    secondary: {
      main: purple[70],
      dark: purple[90],
      alpha: purple[10],
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
    },
    action: {
      hoverOpacity: 0.04,
      disabledBackground: 'rgba(0,0,0,0.12)',
      disabled: 'rgba(0,0,0,0.26)',
    },
  },
}

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * @default 'button'
   */
  component?: React.ElementType
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation?: boolean
  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode
  /**
   * @ignore
   */
  focusVisibleClassName?: string
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string
  loading?: boolean
  loadingIndicator?: string
  loadingPosition?: 'start' | 'center' | 'end' | 'cover' | 'icon'
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Element placed before the children.
   */
  startIcon?: string
  /**
   * @ignore
   */
  type?: 'button' | 'reset' | 'submit'
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?: 'contained' | 'outlined' | 'text'
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const {
    children,
    color = 'primary',
    component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    loading = false,
    loadingIndicator = 'Loading...',
    loadingPosition = 'cover',
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text',
    ...other
  } = props

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    fullWidth,
    size,
    type,
    variant,
    loading,
    loadingPosition:
      loadingPosition === 'cover' || (!startIconProp && !endIconProp) ? 'cover' : loadingPosition,
  }

  const startIcon = startIconProp && (
    <span css={startIconStyle({ ownerState })}>{startIconProp}</span>
  )

  const endIcon = endIconProp && <span css={endIconStyle({ ownerState })}>{endIconProp}</span>
  return (
    <ButtonBase
      css={rootStyle({ ownerState, theme })}
      className={className}
      component={component}
      disabled={disabled || loading}
      focusVisibleClassName={focusVisibleClassName}
      ref={ref}
      type={type}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
      {loading && <div css={loadingIndicatorStyles(ownerState)}>{loadingIndicator}</div>}
    </ButtonBase>
  )
})

export default Button

const loadingIndicatorStyles = ({
  loadingPosition,
  startIcon,
  endIcon,
}: Pick<ButtonProps, 'loadingPosition' | 'startIcon' | 'endIcon'>) => ({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex',
  ...(loadingPosition === 'cover' && {
    left: '50%',
    transform: 'translate(-50%)',
    color: 'rgba(0,0,0,0.26)',
  }),
  ...(loadingPosition === 'icon' &&
    !!endIcon && {
      right: 14,
    }),
  ...(loadingPosition === 'icon' &&
    !!startIcon && {
      left: 14,
    }),
})

const rootStyles = () => ({
  padding: '8px 16px',
  borderRadius: 6,
  color: 'white',
  backgroundColor: blue[70],
})

// position: absolute;
// visibility: visible;
// display: flex;
// left: 50%;
// transform: translate(-50%);
// color: rgba(255, 255, 255, 0.3);

const commonIconStyles = (ownerState: Pick<ButtonProps, 'size'>) => ({
  ...(ownerState.size === 'small' && {
    '& > *:nth-of-type(1)': {
      fontSize: 18,
    },
  }),
  ...(ownerState.size === 'medium' && {
    '& > *:nth-of-type(1)': {
      fontSize: 20,
    },
  }),
  ...(ownerState.size === 'large' && {
    '& > *:nth-of-type(1)': {
      fontSize: 22,
    },
  }),
})

const rootStyle = ({
  theme,
  ownerState,
}: {
  theme: ThemeProps
  ownerState: Pick<
    ButtonProps,
    'size' | 'variant' | 'color' | 'fullWidth' | 'disableElevation' | 'loading' | 'loadingPosition'
  >
}) => ({
  /**
   * CORE STYLES
   */
  ...theme.typography.button,
  minWidth: 64,
  padding: '6px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'border-color', 'color'],
    {
      duration: theme.transitions.duration.short,
    },
  ),
  /**
   * HOVER STYLES
   */
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: 'rgba(0,0,0,0.04)',
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
    // HOVER - TEXT
    ...(ownerState.variant === 'text' &&
      ownerState.color !== 'inherit' && {
        // backgroundColor: alpha(theme.palette[ownerState.color]?.main, theme.palette.action.hoverOpacity),
        backgroundColor: theme.palette[ownerState.color]?.alpha,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      }),
    // HOVER - OUTLINED
    ...(ownerState.variant === 'outlined' &&
      ownerState.color !== 'inherit' && {
        border: `1px solid ${theme.palette[ownerState.color]?.main}`,
        // backgroundColor: alpha(theme.palette[ownerState.color]?.main, theme.palette.action.hoverOpacity),
        backgroundColor: theme.palette[ownerState.color]?.alpha,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      }),
    // HOVER - CONTAINED
    ...(ownerState.variant === 'contained' && {
      backgroundColor: grey[10],
      boxShadow: shadows[4],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: shadows[2],
        backgroundColor: grey[30],
      },
    }),
    ...(ownerState.variant === 'contained' &&
      ownerState.color !== 'inherit' && {
        backgroundColor: theme.palette[ownerState.color]?.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette[ownerState.color]?.main,
        },
      }),
  },
  /**
   * ACTIVE STYLES
   */
  '&:active': {
    ...(ownerState.variant === 'contained' && {
      boxShadow: shadows[2],
    }),
  },
  /**
   * FOCUS STYLES
   */
  [`&.${buttonClasses.focusVisible}`]: {
    ...(ownerState.variant === 'contained' && {
      boxShadow: shadows[6],
    }),
  },
  /**
   * DISABLED STYLES
   */
  // DISABLED - TEXT
  [`&.${buttonClasses.disabled}`]: {
    color: theme.palette.action.disabled,
    // DISABLED - OUTLINED
    ...(ownerState.variant === 'outlined' && {
      border: `1px solid ${theme.palette.action.disabledBackground}`,
    }),
    // DISABLED - CONTAINED
    ...(ownerState.variant === 'contained' && {
      color: theme.palette.action.disabled,
      boxShadow: shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    }),
    // LOADING - POSITION COVER
    ...(ownerState.loading &&
      (ownerState.loadingPosition === 'center' || ownerState.loadingPosition === 'cover') && {
        color: 'transparent',
      }),
  },
  /**
   * VARIANT STYLES
   */
  // TEXT
  ...(ownerState.variant === 'text' && {
    padding: '6px 8px',
  }),
  ...(ownerState.variant === 'text' &&
    ownerState.color !== 'inherit' && {
      color: theme.palette[ownerState.color]?.main,
    }),
  // OUTLINED
  ...(ownerState.variant === 'outlined' && {
    padding: '5px 15px',
    border: '1px solid currentColor',
  }),
  ...(ownerState.variant === 'outlined' &&
    ownerState.color !== 'inherit' && {
      color: theme.palette[ownerState.color]?.main,
      // border: `1px solid ${alpha(theme.palette[ownerState.color]?.main, 0.5)}`,
      border: `1px solid ${theme.palette[ownerState.color]?.alpha}`,
    }),
  // CONTAINED
  ...(ownerState.variant === 'contained' && {
    // color: theme.palette.getContrastText?.(theme.palette.grey[300]),
    color: 'black',
    backgroundColor: grey[30],
    boxShadow: shadows[2],
  }),
  ...(ownerState.variant === 'contained' &&
    ownerState.color !== 'inherit' && {
      // color: theme.palette[ownerState.color]?.contrastText,
      color: 'white',
      backgroundColor: theme.palette[ownerState.color]?.main,
    }),
  // COLOR - INHERIT
  ...(ownerState.color === 'inherit' && {
    color: 'inherit',
    borderColor: 'currentColor',
  }),
  /**
   * SIZE
   */
  // SIZE - TEXT
  ...(ownerState.size === 'small' &&
    ownerState.variant === 'text' && {
      padding: '4px 5px',
      fontSize: theme.typography.pxToRem(13),
    }),
  ...(ownerState.size === 'large' &&
    ownerState.variant === 'text' && {
      padding: '8px 11px',
      fontSize: theme.typography.pxToRem(15),
    }),
  // SIZE - OUTLINED
  ...(ownerState.size === 'small' &&
    ownerState.variant === 'outlined' && {
      padding: '3px 9px',
      fontSize: theme.typography.pxToRem(13),
    }),
  ...(ownerState.size === 'large' &&
    ownerState.variant === 'outlined' && {
      padding: '7px 21px',
      fontSize: theme.typography.pxToRem(15),
    }),
  // SIZE - CONTAINED
  ...(ownerState.size === 'small' &&
    ownerState.variant === 'contained' && {
      padding: '4px 10px',
      fontSize: theme.typography.pxToRem(13),
    }),
  ...(ownerState.size === 'large' &&
    ownerState.variant === 'contained' && {
      padding: '8px 22px',
      fontSize: theme.typography.pxToRem(15),
    }),
  /**
   * FULL WIDTH
   */
  ...(ownerState.fullWidth && {
    width: '100%',
  }),
  /**
   * DISABLED ELEVATION
   */
  ...(ownerState.disableElevation && {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    [`&.${buttonClasses.focusVisible}`]: {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    [`&.${buttonClasses.disabled}`]: {
      boxShadow: 'none',
    },
  }),
})

const startIconStyle = ({ ownerState }: { ownerState: Pick<ButtonProps, 'size' | 'loading'> }) => ({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
  ...(ownerState.size === 'small' && {
    marginLeft: -2,
  }),
  // whenever 'loading' is true, icon should disappear
  ...(ownerState.loading && {
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    opacity: 0,
  }),
  ...commonIconStyles(ownerState),
})

const endIconStyle = ({ ownerState }: { ownerState: Pick<ButtonProps, 'size' | 'loading'> }) => ({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  ...(ownerState.size === 'small' && {
    marginRight: -2,
  }),
  // whenever 'loading' is true, icon should disappear
  ...(ownerState.loading && {
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    opacity: 0,
  }),
  ...commonIconStyles(ownerState),
})
