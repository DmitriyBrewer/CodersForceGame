/* eslint-disable react/require-default-props */
import { Dispatch, FC, SetStateAction, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import BaseBox from '@/shared/components/ui/BaseBox'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseButton from '@/shared/components/ui/BaseButton'

import { addMessage } from '@/entities/message/model'

import { getMessages } from '@/entities/message/model/selector'

import formatDate from '@/shared/helpers/formatISODate'

import styles from './AddMessage.module.scss'

interface Props {
  replyToId?: number | null
  setReplyToId: Dispatch<SetStateAction<number | null>>
}

const AddMessage: FC<Props> = props => {
  const { replyToId = null, setReplyToId } = props

  const [newMessage, setNewMessage] = useState<string>('')

  const messagesData = useSelector(getMessages)

  const dispatch = useDispatch()

  const handleAddMessage = () => {
    dispatch(
      addMessage({
        id: 6,
        autor: 'asd',
        date: formatDate(new Date().toISOString()),
        message: newMessage,
        replyToId: replyToId || undefined
      })
    )

    setNewMessage('')
    setReplyToId(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  return (
    <BaseBox className={styles.root}>
      {replyToId && (
        <BaseBox className={styles.reply}>
          <BaseTypography variant="body2" color="textSecondary" gutterBottom>
            Ответ на: {messagesData.find(m => m.id === replyToId)?.message}
          </BaseTypography>
        </BaseBox>
      )}
      <BaseTextField
        color="info"
        label="Добавить комментарий"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        onChange={handleChange}
        value={newMessage}
      />
      <BaseButton color="primary" variant="contained" onClick={handleAddMessage}>
        Отправить
      </BaseButton>
    </BaseBox>
  )
}

export default AddMessage
