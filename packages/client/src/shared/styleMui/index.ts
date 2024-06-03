type MuiColorUnion =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'disabled'
  | 'default'

const pirmary: MuiColorUnion = 'primary'
const secondary: MuiColorUnion = 'secondary'
const info: MuiColorUnion = 'info'
const inherit: MuiColorUnion = 'inherit'
const error: MuiColorUnion = 'error'
const warning: MuiColorUnion = 'warning'
const disabled: MuiColorUnion = 'disabled'
const defaultColor: MuiColorUnion = 'default'
const infoDark = 'info.dark'
const errorDark = 'error.dark'
const textPrimary = 'text.primary'
const backgroundDefault = 'background.default'

export const styleMui = {
  // color
  primary: pirmary,
  infoDark,
  info,
  error,
  disabled,
  warning,
  default: defaultColor,
  inherit,
  secondary,

  // components
  testBgComponent: { color: textPrimary, bgcolor: backgroundDefault },
  errorTypograpy: { color: errorDark, fontWeight: 'var(--fw600)' },
  paperInfo: { bgcolor: infoDark }
}
