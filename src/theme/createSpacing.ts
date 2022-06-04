/**
 * The multiplier each argument of the spacing fn will receive (default: 4)
 */
export type SpacingOptions = number

// The different signatures imply different meaning for their arguments that can't be expressed structurally.
// We express the difference with variable names.
/* tslint:disable:unified-signatures */
export interface Spacing {
  (): string
  (value: number): string
  (topBottom: number | string, rightLeft: number | string): string
  (top: number | string, rightLeft: number | string, bottom: number | string): string
  (
    top: number | string,
    right: number | string,
    bottom: number | string,
    left: number | string,
  ): string
}
/* tslint:enable:unified-signatures */

export default function createSpacing(spacingInput: SpacingOptions = 4): Spacing {
  // Neighbor layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage

  const spacing = (...argsInput: ReadonlyArray<number | string>): string => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(argsInput.length <= 4)) {
        console.error(
          `UI-KIT: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`,
        )
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput

    return args
      .map((argument) => {
        // '7px' => '7px'; '7rem' => '7rem'; 7 => 7 * 4; '7' => 7 * 4;
        const output = Number.isNaN(+argument) ? argument : +argument * spacingInput
        return typeof output === 'number' ? `${output}px` : output
      })
      .join(' ')
  }

  return spacing
}
