import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { IJoinMatch, IPlayCard, IUpdateCardPosition, Match } from '../../declarations'
import { useSocket } from './Socket'

type ContextType = {
  match: Match
  playerId: string
  updateCardPosition: (data: IUpdateCardPosition) => void
  opponents: {
    idx: number
    match?: Match[string]
  }[]
}

const Context = createContext({} as ContextType)

const decks: Record<string, string[]> = {
  '1': ['1 Island', '1 Swamp', '1 Scion of the Ur-Dragon'],
  '2': ['3 Island'],
  '3': ['3 Swamp'],
  '4': ['3 Scion of the Ur-Dragon'],
}

const posByIdx: Record<number, [number, number, number, string]> = {
  0: [-1, 3, -1, '>'],
  1: [2, -2, 4, '<'],
  2: [1, -3, 4, '<'],
}

const getOpponentByPos = (match: Match, playerId: string) => (pos: number) => {
  const playerIdx = match[playerId].playerIndex
  const keys = Object.keys(match).filter((id) => id !== playerId)

  const idx = keys.findIndex((id) => {
    const values = posByIdx[pos]
    const operator = values[3]

    const firstValue = playerIdx + values[0]
    const secondValue = playerIdx + values[1]

    const condition = operator === '>' ? firstValue > values[2] : firstValue < values[2]

    return match[id].playerIndex === (condition ? firstValue : secondValue)
  })

  return {
    idx,
    match: match?.[keys[idx]],
  }
}

const MatchProvider: React.FC = ({ children }) => {
  const [match, setMatch] = useState<Match>()
  const socket = useSocket()

  const router = useRouter()

  const playerId = typeof router?.query.playerId !== 'undefined' ? `${router.query.playerId}` : null

  useEffect(() => {
    if (!playerId) {
      return undefined
    }

    const data: IJoinMatch = {
      deckList: decks[playerId],
      displayName: 'Patrick Dias',
      playerId,
    }

    socket.emit('joinMatch', data)

    socket.on('updateMatch', (match: Match) => {
      setMatch(match)
    })

    const handler = (e: KeyboardEvent) => {
      console.log(e.key)
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        const playCardData: IPlayCard = {
          cardIndex: 0,
          playerId,
        }

        socket.emit('playCard', playCardData)
      }
    }

    window.addEventListener('keypress', handler)

    return () => {
      window.removeEventListener('keypress', handler)
    }
  }, [playerId, socket])

  useEffect(() => {
    console.log(match)
  }, [match])

  const updateCardPosition = useCallback(
    (data: IUpdateCardPosition) => {
      socket.emit('updateCardPosition', data)
    },
    [socket]
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
      {match && playerId && opponents && (
        <Context.Provider value={{ match, playerId, updateCardPosition, opponents }}>
          {children}
        </Context.Provider>
      )}
    </>
  )
}

export const useMatch = () => {
  const context = useContext(Context)

  return context
}

export default MatchProvider
