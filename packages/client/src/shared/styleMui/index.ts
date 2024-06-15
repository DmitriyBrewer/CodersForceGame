const primaryDark = 'primary.dark'
const errorDark = 'error.dark'
const bgDefault = 'background.default'

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

  bgColorGame: { bgcolor: bgDefault }
}
