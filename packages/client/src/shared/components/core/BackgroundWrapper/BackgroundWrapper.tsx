import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  children: ReactNode
  // eslint-disable-next-line react/require-default-props
  className?: string
  backgroundUrl: string
  // eslint-disable-next-line react/require-default-props
  filter?: string
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Background = styled.div<{ backgroundUrl: string; filter?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: url(${props => props.backgroundUrl}) no-repeat center center / cover;
  filter: ${props => props.filter};
`

const BackgroundWrapper: FC<Props> = ({ backgroundUrl, filter = 'none', children, className = '' }) => {
  return (
    <Wrapper className={className}>
      <Background backgroundUrl={backgroundUrl} filter={filter} />
      {children}
    </Wrapper>
  )
}

export default BackgroundWrapper
