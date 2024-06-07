import { FC, useState } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseBox from '@/shared/components/ui/BaseBox'

import CreateTopicDialog from '@/feature/forum/ui/CreateTopicDialog'

const AddTopicButton: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <BaseBox>
      <BaseButton variant="contained" color="primary" onClick={handleOpenDialog}>
        Создать топик
      </BaseButton>
      <CreateTopicDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </BaseBox>
  )
}

export default AddTopicButton
