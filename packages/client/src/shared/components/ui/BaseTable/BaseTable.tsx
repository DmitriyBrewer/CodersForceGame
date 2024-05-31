import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { v4 as uuidv4 } from 'uuid'

type Props = {
  headers: Record<string, string>[]
  data: {
    [key: string]: string | number
  }[]
}

const BaseTable = (props: Props) => {
  const { headers, data } = props
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map(({ text, id }) => (
              <TableCell key={uuidv4()}>{text}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Record<string, any>) => (
            <TableRow key={uuidv4()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {headers.map(({ value }, i) => (
                <TableCell key={uuidv4()}>{row[value]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BaseTable
