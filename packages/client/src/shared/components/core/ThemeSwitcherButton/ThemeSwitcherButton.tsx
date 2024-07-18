import { FC, useContext } from 'react'

import { Theme, useTheme } from '@mui/material/styles'

import { PaletteMode } from '@mui/material'

import { ThemeContext } from '@/shared/context/theme-provider/ThemeProvider'
import { IconBrightness4, IconBrightness7 } from '@/shared/components/icons/iconsMui'
import BaseButton from '@/shared/components/ui/BaseButton'
import { styleMui } from '@/shared/styleMui'

interface CustomTheme extends Theme {
  mode: PaletteMode
}

export const ThemeSwitcherButton: FC = () => {
  const themeContext = useContext(ThemeContext)

  const theme = useTheme<CustomTheme>()
  return (
    <BaseButton
      onClick={themeContext?.toggleColorMode}
      endIcon={theme.mode === 'dark' ? <IconBrightness4 /> : <IconBrightness7 />}
      sx={styleMui.themeSwitcherButton}>
      {theme.mode} mode
    </BaseButton>
  )
}

export default ThemeSwitcherButton
