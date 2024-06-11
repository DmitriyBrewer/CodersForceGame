import { ChangeEvent, FC } from 'react'

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const ProfileFileInput: FC<Props> = ({ onChange }) => {
  return <input type="file" hidden accept="image/*" onChange={onChange} />
}

export default ProfileFileInput
