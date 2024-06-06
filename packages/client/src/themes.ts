import { createTheme } from '@mui/material/styles'
import { PaletteOptions } from '@mui/material/styles/createPalette'
import { PaletteMode } from '@mui/material'

const lightTheme: PaletteOptions = {
  background: {
    default: '#F4F4F4',
    paper: '#E2E2E2'
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(14, 60, 227, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  primary: {
    main: '#6930C3',
    light: '#B086F4',
    dark: '#370F75',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#EC4899',
    light: '#FF7EB4',
    dark: '#C20F9B',
    contrastText: '#FFFFFF'
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
    contrastText: '#FFFFFF'
  },
  info: {
    main: '#29B6F6',
    light: '#4FC3F7',
    dark: '#0288D1',
    contrastText: '#FFFFFF'
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF'
  }
}

const darkTheme: PaletteOptions = {
  background: {
    default: '#121212',
    paper: '#323232'
  },
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)'
  },
  primary: {
    main: '#5117AB',
    light: '#855BC9',
    dark: '#430C99',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#DA1B8E',
    light: '#DA53D5',
    dark: '#B80D92',
    contrastText: '#FFFFFF'
  },
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#FFA726',
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },
  info: {
    main: '#29B6F6',
    light: '#4FC3F7',
    dark: '#0288D1',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },
  success: {
    main: '#66BB6A',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  }
}

const lightMuiTheme = createTheme({
  palette: lightTheme
})

const darkMuiTheme = createTheme({
  palette: darkTheme
})

export const getDesignTokens = (mode: PaletteMode) => ({
  mode,
  ...(mode === 'dark' ? darkMuiTheme : lightMuiTheme)
})
