import React, { FC } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

import styles from './EmojiSelector.module.scss'

interface EmojiSelectorProps {
  onEmojiClick: (emojiData: EmojiClickData) => void
}

const EmojiSelector: FC<EmojiSelectorProps> = ({ onEmojiClick }) => {
  return (
    <div className={styles.emojiSelector}>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default EmojiSelector
