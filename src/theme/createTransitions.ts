// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
}

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
}

function formatMs(milliseconds: number) {
  return `${Math.round(milliseconds)}ms`
}

function getAutoHeightDuration(height: number) {
  if (!height) {
    return 0
  }

  const constant = height / 36

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
}

export type TransitionsOptions = {
  easing?: Record<string, string>
  duration?: Record<string, number>
}

export default function createTransitions(transitionsInput: TransitionsOptions = {}) {
  const mergedEasing = {
    ...easing,
    ...transitionsInput.easing,
  }

  const mergedDuration = {
    ...duration,
    ...transitionsInput.duration,
  }

  type CreateOptions = {
    duration?: number
    easing?: string
    delay?: number
  }

  const create = (props = ['all'], options: CreateOptions = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options

    if (process.env.NODE_ENV !== 'production') {
      const isString = (value: string | number | string[]) => typeof value === 'string'
      // IE11 support, replace with Number.isNaN
      // eslint-disable-next-line no-restricted-globals
      const isNumber = (value: string | number) => !isNaN(parseFloat(value as string))
      if (!isString(props) && !Array.isArray(props)) {
        console.error('UI_KIT: Argument "props" must be a string or Array.')
      }

      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(
          `UI_KIT: Argument "duration" must be a number or a string but found ${durationOption}.`,
        )
      }

      if (!isString(easingOption)) {
        console.error('UI_KIT: Argument "easing" must be a string.')
      }

      if (!isNumber(delay) && !isString(delay)) {
        console.error('UI_KIT: Argument "delay" must be a number or a string.')
      }

      if (Object.keys(other).length !== 0) {
        console.error(`UI_KIT: Unrecognized argument(s) [${Object.keys(other).join(',')}].`)
      }
    }

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${
            typeof durationOption === 'string' ? durationOption : formatMs(durationOption)
          } ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`,
      )
      .join(',')
  }

  return {
    getAutoHeightDuration,
    create,
    ...transitionsInput,
    easing: mergedEasing,
    duration: mergedDuration,
  }
}
