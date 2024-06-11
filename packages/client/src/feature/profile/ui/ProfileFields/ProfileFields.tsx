import { v4 as uuidv4 } from 'uuid'
import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { User, Field } from '@/feature/profile/hooks/useProfile'

type Props = {
  fields: Field[]
  userData: User | null
}

const ProfileFields: FC<Props> = ({ fields, userData }) => {
  return (
    <>
      {fields.map(({ label, name }) => (
        <BaseTextField
          label={label}
          name={name}
          defaultValue={userData?.[name]}
          key={uuidv4()}
          InputProps={{ disabled: true }}
        />
      ))}
    </>
  )
}

export default ProfileFields
