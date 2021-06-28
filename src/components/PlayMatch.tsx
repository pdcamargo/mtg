import React, { memo } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import Deck from './Deck'
import { useMethods } from '../providers/MatchProvider/hooks'

type PlayMatchProps = {
  size: 'sm' | 'md' | 'lg'
  url: string
  displayName?: string
  playerId?: string
  'data-playmat'?: string | number
}

const baseWidth = 610
const baseHeight = 330
const playMatchPropsBySize: Record<PlayMatchProps['size'], BoxProps> = {
  sm: {
    width: `${baseWidth * 0.7}px`,
    height: `${baseHeight * 0.7}px`,
  },
  md: {
    width: `${baseWidth * 0.85}px`,
    height: `${baseHeight * 0.85}px`,
  },
  lg: {
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
  },
}

const propsByIdx: Record<number, BoxProps> = {
  1: {
    transform: 'rotate(-90deg) translateX(+50%)',
  },
  2: {
    transform: 'rotate(-180deg) translateX(-50%)',
  },
  3: {
    transform: 'rotate(-270deg) translateX(-50%)',
  },
}

const PlayMatch: React.FC<PlayMatchProps> = memo(
  ({ size, url, children, displayName, playerId, ...props }) => {
    const { drawCard } = useMethods()

    const playmatchIndex = props['data-playmat'] ? +props['data-playmat'] : undefined

    return (
      <Box
        {...playMatchPropsBySize[size]}
        bgColor="gray.500"
        position="relative"
        bgImage={`url(${url})`}
        bgSize="100% 100%"
        borderRadius="5px"
        zIndex="1"
        {...props}
      >
        {children}

        <Box
          display="inline-flex"
          position="absolute"
          textTransform="uppercase"
          fontWeight="bold"
          fontSize="sm"
          textShadow="2px 2px black"
          bottom="-40px"
          right="10px"
          {...(playmatchIndex && propsByIdx[playmatchIndex])}
        >
          {displayName}
        </Box>

        {playerId && typeof playmatchIndex !== 'undefined' && (
          <Box pos="absolute" right="10px" top="10px" display="inline-flex">
            <Deck
              playerId={playerId}
              playMatchIndex={playmatchIndex}
              onDraw={() => {
                if (playmatchIndex === 0) {
                  drawCard(1)
                }
              }}
            />
          </Box>
        )}
      </Box>
    )
  }
)

export default PlayMatch
