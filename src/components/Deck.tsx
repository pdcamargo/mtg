import React, { memo, useMemo } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

import { useMatch } from '../providers/MatchProvider/hooks'

const getPropsByIdx = (cardIndex: number) => (playMatchIndex: number) => {
  const topMod = 0.42
  const leftMod = 0.23
  const valuesByIdx: Record<number, BoxProps> = {
    0: {
      top: `${-cardIndex * topMod}px`,
      left: `${cardIndex * leftMod}px`,
    },
    1: {
      top: `0px`,
      left: `-${cardIndex * topMod}px`,
    },
    2: {
      top: `${cardIndex * topMod}px`,
      left: `${cardIndex * leftMod}px`,
    },
    3: {
      top: `0px`,
      left: `${cardIndex * topMod}px`,
    },
  }

  return valuesByIdx[playMatchIndex]
}

type DeckCardProps = {
  cardIndex: number
  playMatchIndex: number
  sleeveColor: string
  sleeveColorGradient: string
}

const DeckCard: React.FC<DeckCardProps> = memo(
  ({ cardIndex, playMatchIndex, sleeveColor, sleeveColorGradient }) => {
    const props = getPropsByIdx(cardIndex)(playMatchIndex)

    return (
      <Box
        pos="absolute"
        width="70px"
        height="90px"
        bgImg={`${sleeveColorGradient}`}
        bgColor={sleeveColor}
        boxShadow="0px -4px 6px 5px rgba(0, 0, 0, 0.01)"
        border="solid 1px"
        borderColor="blackAlpha.500"
        bgSize="100% 100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textShadow="1px 1px black"
        fontWeight="bold"
        {...props}
      >
        {cardIndex + 1}
      </Box>
    )
  }
)

type DeckProps = {
  playerId: string
  playMatchIndex: number
  onDraw?: () => void
}

const Deck: React.FC<DeckProps> = ({ playerId, playMatchIndex, onDraw }) => {
  const match = useMatch()
  const cards = match[playerId]?.mtg.deck

  const deckCards = useMemo(() => {
    return (
      <>
        {cards.map((card, cardIndex) => (
          <DeckCard
            key={`${card.id}${cardIndex}`}
            cardIndex={cardIndex}
            playMatchIndex={playMatchIndex}
            sleeveColor={match[playerId].sleeveColor}
            sleeveColorGradient={match[playerId].sleeveColorGradient}
          />
        ))}
      </>
    )
  }, [cards, match, playMatchIndex, playerId])

  return (
    <Box pos="relative" width="70px" height="90px" onDoubleClick={onDraw} userSelect="none">
      {deckCards}
    </Box>
  )
}

export default Deck
