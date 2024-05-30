import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { FC } from 'react'

const BaseLink: FC<MuiLinkProps & RouterLinkProps> = props => {
  return <MuiLink component={RouterLink} {...props} />
}

export default BaseLink
