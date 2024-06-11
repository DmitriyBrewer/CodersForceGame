import { FC, useState } from 'react'

import { TextField } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseDialog from '@/shared/components/ui/BaseDialog'

import RegisterPasswordInput from '@/feature/session/register/ui/RegisterPasswordInput'

const ProfilePassword: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <BaseBox display="flex">
      <BaseButton onClick={() => setOpen(true)}>Изменить пароль</BaseButton>
      <BaseDialog open={open} onClose={() => setOpen(false)}>
        <TextField label="Пароль">123</TextField>
        {/* <RegisterPasswordInput /> */}
        {/* <RegisterPasswordInput /> */}
        <BaseButton>Сохранить</BaseButton>
      </BaseDialog>
    </BaseBox>
  )
}

export default ProfilePassword
