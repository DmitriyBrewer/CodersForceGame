import React, { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'

import styles from './EmojiDisplay.module.scss'

interface EmojiDisplayProps {
  reactions: { [emoji: string]: number }
  onRemove: (emoji: string) => void
}

const EmojiDisplay: FC<EmojiDisplayProps> = ({ reactions, onRemove }) => {
  return (
    <>
      {Object.entries(reactions).map(([emoji, count]) => (
        <BaseButton className={styles.emoji} key={emoji} variant="contained" onClick={() => onRemove(emoji)}>
          {emoji} {count > 1 && <BaseListItemText className={styles.count}>{count}</BaseListItemText>}
        </BaseButton>
      ))}
    </>
  )
}

export default EmojiDisplay
