const primaryDark = 'primary.dark'
const errorDark = 'error.dark'
const bgDefault = 'background.default'
const primary = 'primary.main'
const primaryContrastText = 'primary.contrastText'

export const styleMui = {
  errorPageWidget: {
    title: {
      fontWeight: 'var(--fw700)',
      fontSize: 'var(--fs160)',
      color: errorDark
    },
    subTitle: {
      fontWeight: 'var(--fw600)',
      color: primaryDark
    },
    link: {
      mt: 'var(--m20)'
    }
  },

  secsionContainer: { padding: 'var(--m20)' },

  baseTableRow: { '&:last-child td, &:last-child th': { border: 0 } },

  bgColorGame: { bgcolor: bgDefault },
  navbarContainer: { display: 'flex', justifyContent: 'space-between', padding: 'var(--s20)' },
  navbarBox: { display: 'flex', columnGap: 'var(--g20)' },

  navbar: { position: 'relative' },
  footer: { bgcolor: primary },
  footerText: { color: primaryContrastText }
}
