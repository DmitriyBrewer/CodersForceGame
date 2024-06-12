import { FC, useState } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseDialog from '@/shared/components/ui/BaseDialog'
import PasswordInput from '@/shared/components/core/PasswordInput'

import FormData from '@/shared/components/core/FormData'

import BaseTypography from '@/shared/components/ui/BaseTypography'

import { useProfilePassword } from '@/feature/profile/hooks/useProfilePassword'

const ProfilePassword: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { inputProps, handleSubmit } = useProfilePassword()

  const closeDialog = () => setOpen(false)
  const openDialog = () => setOpen(true)

  return (
    <BaseBox display="flex">
      <BaseButton color="secondary" onClick={openDialog}>
        Изменить пароль
      </BaseButton>
      <BaseDialog open={open}>
        <FormData handleSubmit={handleSubmit}>
          <BaseTypography color="primary.dark">Изменить пароль</BaseTypography>
          <PasswordInput label="Старый пароль" name="newPassword" {...inputProps} />
          <PasswordInput label="Новый пароль" name="oldPassword" {...inputProps} />
          <BaseButton type="submit">Сохранить</BaseButton>
          <BaseButton type="button" onClick={closeDialog}>
            Отмена
          </BaseButton>
        </FormData>
      </BaseDialog>
    </BaseBox>
  )
}

export default ProfilePassword
