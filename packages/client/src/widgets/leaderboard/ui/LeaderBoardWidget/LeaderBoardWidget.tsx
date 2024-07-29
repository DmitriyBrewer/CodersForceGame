import { FC } from 'react'

import BasicTable from '@/shared/components/ui/BaseTable'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseContainer from '@/shared/components/ui/BaseContainer'
import BaseLoader from '@/shared/components/ui/BaseLoader'
import { useGetLeaderboardQuery } from '@/entities/leaderboard/api/leaderboardApi'

const LeaderBoardWidget: FC = () => {
  const {
    data: leaderboardData,
    isLoading,
    isError
  } = useGetLeaderboardQuery({
    ratingFieldName: 'codersforce',
    cursor: 0,
    limit: 10
  })

  if (isLoading) {
    return <BaseLoader />
  }

  if (isError || !leaderboardData || !Array.isArray(leaderboardData)) {
    return <BaseContainer>Ошибка при загрузке данных</BaseContainer>
  }

  const data = leaderboardData.map((leader, index) => ({
    rank: index + 1,
    name: leader.data?.name || 'Unknown',
    points: leader.data?.codersforce || 0
  }))

  const headers = [
    { text: 'Место', value: 'rank' },
    { text: 'Имя', value: 'name' },
    { text: 'Очки', value: 'points' }
  ]

  return (
    <BaseContainer>
      <BaseTypography component="h1" variant="h4" my="var(--s28)">
        Лучшие результаты игры
      </BaseTypography>
      <BasicTable headers={headers} data={data} />
    </BaseContainer>
  )
}

export default LeaderBoardWidget
