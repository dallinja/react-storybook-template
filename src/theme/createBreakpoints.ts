// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl']

export type BreakpointsOptions<TValues extends Record<string, number>> = {
  values?: TValues
  unit?: string
  step?: number
}

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints<
  TValues extends Record<string, number>,
  TKey extends keyof TValues,
>(breakpointsInput?: BreakpointsOptions<TValues>) {
  const valuesDefault = {
    xs: 0, // phone
    sm: 600, // tablet
    md: 900, // small laptop
    lg: 1200, // desktop
    xl: 1536, // large screen
  }
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = valuesDefault,
    unit = 'px',
    step = 5,
    ...other
  } = breakpointsInput || {}

  const sortedValues = sortedBreakpointsArray(values)
  const keys = sortedValues.map(({ key }) => key)

  function up(key: TKey) {
    const value = (values as TValues)[key]
    return `@media (min-width:${value}${unit})`
  }

  function down(key: TKey) {
    const value = typeof values[key] === 'number' ? values[key] : key
    return `@media (max-width:${value - step / 100}${unit})`
  }

  function between(start: TKey, end: TKey) {
    const endIndex = keys.indexOf(end)

    return (
      `@media (min-width:${
        typeof values[start] === 'number' ? values[start] : start
      }${unit}) and ` +
      `(max-width:${
        (endIndex !== -1 && typeof values[keys[endIndex]] === 'number'
          ? values[keys[endIndex]]
          : end) -
        step / 100
      }${unit})`
    )
  }

  function only(key: TKey) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1])
    }

    return up(key)
  }

  function not(key: TKey) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key)
    if (keyIndex === 0) {
      return up(keys[1])
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex])
    }

    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and')
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    not,
    unit,
    ...other,
  }
}

function sortedBreakpointsArray(values: BreakpointsOptions['values']) {
  const breakpointsAsArray = Object.keys(values).map((key) => ({ key, val: values[key] })) || []
  // Sort in ascending order
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val)
  return breakpointsAsArray
}
// return breakpointsAsArray.reduce((acc, obj) => {
//   return { ...acc, [obj.key]: obj.val }
// }, {})

// const myValues = { mobile: 500, tablet: 900 }
// // const breakpoints = createBreakpoints({ values: myValues })
// const breakpoints = createBreakpoints()

// breakpoints.up('mobile')
// breakpoints.up('xs')

// function getProperty<Type extends Record<string, number>, Key extends keyof Type>(props?: {
//   obj?: Type
//   key?: Key
// }) {
//   const def = { z: 9 }
//   const { obj, key } = props || { obj: def }
//   return obj?.[key]
// }

// const x = { a: 1, b: 2, c: 3, d: 4 }

// getProperty({ obj: x, key: 'a' })
// getProperty({ obj: x, key: 'm' })
// getProperty({ key: 'm' })
