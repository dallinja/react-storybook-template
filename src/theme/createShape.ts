export type ShapeOptions = {
  borderRadius?: number
}

export default function createShape(shapeInput?: ShapeOptions) {
  return {
    borderRadius: shapeInput?.borderRadius || 4,
  }
}
