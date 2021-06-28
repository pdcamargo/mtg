import { useContextSelector } from 'use-context-selector'
import { MatchProviderContext } from './index'

const useMatch = () => {
  const match = useContextSelector(MatchProviderContext, (value) => value.match)

  return match
}

const usePlayer = () => {
  const player = useContextSelector(MatchProviderContext, (value) => value.player)

  return player
}

const useOpponents = () => {
  const opponents = useContextSelector(MatchProviderContext, (value) => value.opponents)

  return opponents
}

const useMethods = () => {
  const tapCard = useContextSelector(MatchProviderContext, (value) => value.tapCard)
  const drawCard = useContextSelector(MatchProviderContext, (value) => value.drawCard)
  const playCard = useContextSelector(MatchProviderContext, (value) => value.playCard)
  const updateCardPosition = useContextSelector(
    MatchProviderContext,
    (value) => value.updateCardPosition
  )

  return {
    tapCard,
    playCard,
    drawCard,
    updateCardPosition,
  }
}

export { usePlayer, useOpponents, useMatch, useMethods }
