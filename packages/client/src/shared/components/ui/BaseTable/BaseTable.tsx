import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { v4 as uuidv4 } from 'uuid'

import { styleMui } from '@/shared/styleMui'

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
            {headers.map(({ text }) => (
              <TableCell key={uuidv4()}>{text}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={uuidv4()} sx={styleMui.baseTableRow}>
              {headers.map(({ value }) => (
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
