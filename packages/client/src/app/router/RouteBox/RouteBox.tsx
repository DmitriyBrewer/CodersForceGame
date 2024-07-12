import { FC, PropsWithChildren } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'

import styles from './RouteBox.module.scss'

const RouteBox: FC<PropsWithChildren> = ({ children }) => {
  return <BaseBox className={styles.root}>{children}</BaseBox>
}

export default RouteBox
