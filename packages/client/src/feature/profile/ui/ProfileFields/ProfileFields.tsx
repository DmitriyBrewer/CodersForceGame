import { FC } from 'react'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import { User } from '@/entities/user/types'

import { Field } from '@/feature/profile/types'

type Props = {
  fields: Field[]
  userData: User | undefined
}

const ProfileFields: FC<Props> = ({ fields, userData }) => {
  return (
    <>
      {fields.map(({ label, name, id }) => (
        <BaseTextField
          label={label}
          name={name}
          defaultValue={userData?.[name]}
          key={id}
          InputProps={{ disabled: true }}
        />
      ))}
    </>
  )
}

export default ProfileFields
