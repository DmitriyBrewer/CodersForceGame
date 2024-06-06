import { FC, PropsWithChildren } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseIconButton from '@/shared/components/ui/BaseIconButton'
import { IconClose } from '@/shared/components/icons/iconsMui'
import BaseBox from '@/shared/components/ui/BaseBox'

import LeaderBoardWidget from '@/widgets/leaderboard'

import styles from './GameLeaderboardButton.module.scss'

interface Props {
  handleOpenLeaderboard: () => void
  handleCloseLeaderboard: () => void
  openLeaderboard: boolean
}

const GameLeaderboardButton: FC<PropsWithChildren<Props>> = ({
  children,
  handleOpenLeaderboard,
  handleCloseLeaderboard,
  openLeaderboard
}) => {
  return (
    <>
      <BaseButton onClick={handleOpenLeaderboard} variant="contained" color="info">
        {children}
      </BaseButton>
      <BaseDialog open={openLeaderboard} onClose={handleCloseLeaderboard}>
        <BaseBox className={styles.root}>
          <BaseIconButton aria-label="close" onClick={handleCloseLeaderboard}>
            <IconClose />
          </BaseIconButton>
        </BaseBox>
        <LeaderBoardWidget />
      </BaseDialog>
    </>
  )
}

export default GameLeaderboardButton
