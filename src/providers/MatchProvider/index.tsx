import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createContext } from 'use-context-selector'
import { useRouter } from 'next/router'

import {
  IDrawCard,
  IJoinMatch,
  IPlayCard,
  ITapCard,
  IUpdateCardPosition,
  Match,
  MatchPlayer,
} from '../../../declarations'
import { useSocket } from '../SocketProvider'
import { decks, playmatchs, sleeveColors, sleeveColorGradients, playerNames } from './props'
import { getOpponentByPos } from './utils'

type ContextType = {
  match: Match
  playerId: string
  player: MatchPlayer
  updateCardPosition: (data: IUpdateCardPosition) => void
  tapCard: (data: ITapCard) => void
  playCard: (cardIndex: number) => void
  drawCard: (amount: number) => void
  opponents: {
    idx: number
    match?: Match[string]
  }[]
}

export const MatchProviderContext = createContext({} as ContextType)

const MatchProvider: React.FC = ({ children }) => {
  const [match, setMatch] = useState<Match>()
  const socket = useSocket()

  const router = useRouter()

  const playerId = typeof router?.query.playerId !== 'undefined' ? `${router.query.playerId}` : null

  const player = match?.[`${playerId}`]

  const joinMatch = useCallback(async () => {
    if (!playerId) {
      return
    }

    const data: IJoinMatch = {
      deckList: decks[playerId],
      displayName: playerNames[playerId],
      playerId,
      playmatchUrl: playmatchs[playerId],
      sleeveColor: sleeveColors[playerId],
      sleeveColorGradient: sleeveColorGradients[playerId],
    }

    socket.emit('joinMatch', data)
  }, [playerId, socket])

  useEffect(() => {
    if (!playerId) {
      return undefined
    }

    joinMatch()

    socket.on('updateMatch', (match: Match) => {
      setMatch(match)
    })
  }, [joinMatch, playerId, socket])

  useEffect(() => {
    console.log(match)
  }, [match])

  const updateCardPosition = useCallback(
    (data: IUpdateCardPosition) => {
      socket.emit('updateCardPosition', data)
    },
    [socket]
  )

  const tapCard = useCallback(
    (data: ITapCard) => {
      socket.emit('tapCard', data)
    },
    [socket]
  )

  const playCard = useCallback(
    (cardIndex: number) => {
      if (!playerId) {
        return
      }

      const playCardData: IPlayCard = {
        cardIndex,
        playerId,
      }

      socket.emit('playCard', playCardData)
    },
    [playerId, socket]
  )

  const drawCard = useCallback(
    (amount: number) => {
      if (!playerId) {
        return
      }

      const drawData: IDrawCard = {
        amount,
        playerId,
      }

      socket.emit('drawCard', drawData)
    },
    [playerId, socket]
  )

  const opponents = useMemo(() => {
    if (!match || !playerId) {
      return null
    }

    const getOpponent = getOpponentByPos(match, playerId)

    return [getOpponent(0), getOpponent(1), getOpponent(2)]
  }, [match, playerId])

  return (
    <>
      {match && playerId && opponents && player && (
        <MatchProviderContext.Provider
          value={{
            match,
            playerId,
            opponents,
            updateCardPosition,
            tapCard,
            playCard,
            drawCard,
            player,
          }}
        >
          {children}
        </MatchProviderContext.Provider>
      )}
    </>
  )
}

export default MatchProvider
