import { FC } from 'react'

import { paths } from '@/shared/config/routing'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseLink from '@/shared/components/ui/BaseLink'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseContainer from '@/shared/components/ui/BaseContainer'
import BackgroundWrapper from '@/shared/components/core/BackgroundWrapper'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import BaseBox from '@/shared/components/ui/BaseBox'

import backgroundImage from '@/assets/images/bg.png'

import styles from './HomeWidget.module.scss'
import { useOAuth } from '@/feature/session/o-auth/hooks/useOAuth'

const HomeWidget: FC = () => {
  useOAuth()
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(0.5px)">
      <BaseBox className={styles.box}>
        <BaseContainer maxWidth="sm">
          <BasePaperPolymorphic elevation={4} rgap="--g28">
            <BaseTypography variant="h3" component="h1">
              Volga Checkers
            </BaseTypography>
            <BaseTypography variant="body1" component="p">
              Погрузитесь в захватывающий мир уличных гонок в альтернативной России с игрой Volga Checkers. В этой
              увлекательной аркаде игроку предстоит взять под управление легендарную черную Волгу, маневрируя по улицам
              города и соревнуясь с опасными соперниками. Используйте стрелки на клавиатуре для мастерского управления:
              стрелки вправо и влево для точных поворотов и навыкового ухода от препятствий.
            </BaseTypography>
            <BaseLink to={paths.game}>
              <BaseButton variant="contained">Перейти к игре</BaseButton>
            </BaseLink>
          </BasePaperPolymorphic>
        </BaseContainer>
      </BaseBox>
    </BackgroundWrapper>
  )
}

export default HomeWidget
