export type ZIndexOptions = {
  mobileStepper?: number
  fab?: number
  speedDial?: number
  drawer?: number
  modal?: number
  snackbar?: number
  tooltip?: number
}

export default function createZIndex(zIndexInput?: ZIndexOptions) {
  return {
    mobileStepper: zIndexInput?.mobileStepper || 1000,
    fab: zIndexInput?.fab || 1050,
    speedDial: zIndexInput?.speedDial || 1050,
    drawer: zIndexInput?.drawer || 1200,
    modal: zIndexInput?.modal || 1300,
    snackbar: zIndexInput?.snackbar || 1400,
    tooltip: zIndexInput?.tooltip || 1500,
  }
}
