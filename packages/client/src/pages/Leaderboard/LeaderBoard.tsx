import BasicTable from '@/shared/components/ui/BaseTable'
import BaseTypography from '@/shared/components/ui/BaseTypography'

// TODO: feature/cfg-24 получить данные с сервера
const LeaderBoard = () => {
  const data = [
    { rank: 1, name: 'Frozen yoghurt', points: 303, email: 'some@mail.ru' },
    { rank: 2, name: 'Cupcake', points: 248, email: 'some2@mail.ru' },
    { rank: 3, name: 'Gingerbread', points: 101, email: 'some3@mail.ru' }
  ]

  const headers = [
    { text: 'Место', value: 'rank' },
    { text: 'Имя', value: 'name' },
    { text: 'Очки', value: 'points' }
  ]

  return (
    <>
      <BaseTypography component="h1" variant="h4" my="var(--s28)">
        Лучшие результаты игры
      </BaseTypography>
      <BasicTable headers={headers} data={data} />
    </>
  )
}

export default LeaderBoard
