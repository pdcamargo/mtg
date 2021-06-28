import React from 'react'

import PlayableField from '../components/PlayableField'
import Hand from '../components/Hand'

import MatchProvider from '../providers/MatchProvider'
import SocketProvider from '../providers/SocketProvider'

const Playground: React.FC = () => {
  return (
    <SocketProvider>
      <MatchProvider>
        <PlayableField />
        <Hand />
      </MatchProvider>
    </SocketProvider>
  )
}

export default Playground
