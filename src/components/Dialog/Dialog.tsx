/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import Paper from '../Paper/Paper'
import Fade from '../Fade/Fade'
import Backdrop, { BackdropProps } from '../Backdrop/Backdrop'
import Modal from '../Modal/Modal'
import DialogContext from './DialogContext'

export type DialogProps = {
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   */
  BackdropComponent?: React.ElementType
  /**
   * Props applied to the backdrop element.
   */
  BackdropProps?: Record<string, any>
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: React.ReactNode
  /**
   * @ignore
   */
  className?: string
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | string
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: (event: unknown, reason: 'escapeKeyDown' | 'backdropClick') => void
  /**
   * If `true`, the component is shown.
   */
  open: boolean
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent?: React.ElementType
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   */
  PaperProps?: Record<string, any>
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll?: 'body' | 'paper'
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent?: React.ElementType
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration?: number | { appear?: number; enter?: number; exit?: number }
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps?: Record<string, any>
}

const Dialog = React.forwardRef<HTMLElement, DialogProps>((props, ref) => {
  const defaultTransitionDuration = {
    // enter: theme.transitions.duration.enteringScreen,
    // exit: theme.transitions.duration.leavingScreen,
    enter: 225,
    exit: 225,
  }
  const backupId = React.useId()
  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledby = backupId,
    BackdropComponent,
    BackdropProps,
    children,
    className,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onClose,
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = Fade,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    ...other
  } = props
  const backdropClick = React.useRef<boolean | null>(null)
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget
  }
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return
    }

    backdropClick.current = null

    if (onClose) {
      onClose(event, 'backdropClick')
    }
  }

  const dialogContextValue = React.useMemo(() => {
    return { titleId: ariaLabelledby }
  }, [ariaLabelledby])

  const ownerState = {
    scroll,
    maxWidth,
    fullWidth,
    fullScreen,
  }

  const values: Record<string, number> = {
    xs: 0, // phone
    sm: 600, // tablet
    md: 900, // small laptop
    lg: 1200, // desktop
    xl: 1536, // large screen
  }

  const theme = {
    breakpoints: {
      values,
      unit: 'px',
      down: (key: string) => {
        const value = typeof values[key] === 'number' ? values[key] : key
        return `@media (min-width:${value}px)`
      },
    },
  }

  return (
    <Modal
      // className={clsx(classes.root, className)}
      BackdropProps={{
        transitionDuration,
        as: BackdropComponent,
        ...BackdropProps,
      }}
      closeAfterTransition
      BackdropComponent={DialogBackdrop}
      disableEscapeKeyDown={disableEscapeKeyDown}
      onClose={onClose}
      open={open}
      ref={ref}
      onClick={handleBackdropClick}
      // ownerState={ownerState}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        timeout={transitionDuration}
        role="presentation"
        {...TransitionProps}
      >
        {/* roles are applied via cloneElement from TransitionComponent */}
        {/* roles needs to be applied on the immediate child of Modal or it'll inject one */}
        <div
          // className={clsx(classes.container)}
          css={dialogContainerStyles({ scroll })}
          onMouseDown={handleMouseDown}
        >
          <Paper
            css={paperStyles({ ownerState, theme })}
            elevation={4}
            role="dialog"
            aria-describedby={ariaDescribedby}
            aria-labelledby={ariaLabelledby}
            {...PaperProps}
            // className={clsx(classes.paper, PaperProps.className)}
          >
            <DialogContext.Provider value={dialogContextValue}>{children}</DialogContext.Provider>
          </Paper>
        </div>
      </TransitionComponent>
    </Modal>
  )
})

export default Dialog

const DialogBackdrop = (props: BackdropProps) => (
  <Backdrop
    css={css`
      z-index: -1;
    `}
    {...props}
  />
)

const dialogContainerStyles = ({ scroll }: Pick<DialogProps, 'scroll'>) => css`
  height: 100%;
  /* '@media print': {
    height: 'auto',
  }, */
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0;
  ${scroll === 'paper'
    ? `
    display: flex;
    justify-content: center;
    align-items: center;
  `
    : ''}
  ${scroll === 'body'
    ? `
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    &:after: {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
      width: 0;
    }
  `
    : ''}
`
const paperStyles = ({ ownerState, theme }) => ({
  margin: 32,
  position: 'relative',
  overflowY: 'auto', // Fix IE11 issue, to remove at some point.
  '@media print': {
    overflowY: 'visible',
    boxShadow: 'none',
  },
  ...(ownerState.scroll === 'paper' && {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 64px)',
  }),
  ...(ownerState.scroll === 'body' && {
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'left', // 'initial' doesn't work on IE11
  }),
  ...(!ownerState.maxWidth && {
    maxWidth: 'calc(100% - 64px)',
  }),
  ...(ownerState.maxWidth === 'xs' && {
    maxWidth:
      theme.breakpoints.unit === 'px'
        ? Math.max(theme.breakpoints.values.xs, 444)
        : `${theme.breakpoints.values.xs}${theme.breakpoints.unit}`,
    // [`&.${dialogClasses.paperScrollBody}`]: {
    //   [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
    //     maxWidth: 'calc(100% - 64px)',
    //   },
    // },
  }),
  ...(ownerState.maxWidth !== 'xs' && {
    maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`,
    // [`&.${dialogClasses.paperScrollBody}`]: {
    //   [theme.breakpoints.down(theme.breakpoints.values[ownerState.maxWidth] + 32 * 2)]: {
    //     maxWidth: 'calc(100% - 64px)',
    //   },
    // },
  }),
  ...(ownerState.fullWidth && {
    width: 'calc(100% - 64px)',
  }),
  ...(ownerState.fullScreen && {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
    borderRadius: 0,
    // [`&.${dialogClasses.paperScrollBody}`]: {
    //   margin: 0,
    //   maxWidth: '100%',
    // },
  }),
})
