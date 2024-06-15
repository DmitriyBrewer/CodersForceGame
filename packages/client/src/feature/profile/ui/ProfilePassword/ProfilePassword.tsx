import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseDialog from '@/shared/components/ui/BaseDialog'
import PasswordInput from '@/shared/components/core/PasswordInput'

import FormData from '@/shared/components/core/FormData'

import BaseTypography from '@/shared/components/ui/BaseTypography'

import { useProfilePassword } from '@/feature/profile/hooks/useProfilePassword'

const ProfilePassword: FC = () => {
  const { inputProps, handleSubmit, isLoading, open, setOpen } = useProfilePassword()

  const closeDialog = () => setOpen(false)
  const openDialog = () => setOpen(true)

  return (
    <BaseBox display="flex">
      <BaseButton color="secondary" onClick={openDialog}>
        Изменить пароль
      </BaseButton>
      <BaseDialog open={open}>
        <FormData handleSubmit={handleSubmit}>
          <BaseTypography>Изменить пароль</BaseTypography>
          <PasswordInput label="Старый пароль" name="oldPassword" {...inputProps} />
          <PasswordInput label="Новый пароль" name="newPassword" {...inputProps} />
          <BaseButton color="success" type="submit" disabled={isLoading}>
            Сохранить
          </BaseButton>
          <BaseButton type="button" color="secondary" onClick={closeDialog}>
            Отмена
          </BaseButton>
        </FormData>
      </BaseDialog>
    </BaseBox>
  )
}

export default ProfilePassword
