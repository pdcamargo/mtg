import React from 'react'
import { Box, BoxProps, Text } from '@chakra-ui/react'
import { ICard } from '../../declarations'

type CardProps = {
  id?: string
  position?: BoxProps['position']
  coordinates?: {
    x: number
    y: number
  }
  positionStrategy?: 'absolute' | 'translate'
  canTap?: boolean
  isTapped?: boolean
  card: ICard
  onTapCard?: () => void
  sleeveColor: string
  sleeveColorGradient: string
}

const FieldCard = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      id,
      position,
      coordinates = { x: 0, y: 0 },
      card,
      onTapCard,
      positionStrategy = 'absolute',
      canTap,
      isTapped,
      sleeveColor,
      sleeveColorGradient,
    },
    ref
  ) => {
    const translate =
      positionStrategy === 'translate' ? `translate(${coordinates.x}px, ${coordinates.y}px)` : ''
    const style = {
      left: positionStrategy === 'absolute' ? coordinates.x : 0,
      top: positionStrategy === 'absolute' ? coordinates.y : 0,
    }

    return (
      <Box
        ref={ref}
        id={id}
        transition="transform ease .75s"
        transform={`${translate} rotate(${isTapped ? '90deg' : '0'})`}
        position={position}
        style={style}
        // events
        onDoubleClick={() => canTap && onTapCard?.()}
        bgImg={`${sleeveColorGradient}`}
        bgColor={sleeveColor}
        padding="1px"
        paddingTop="2px"
        boxShadow="0px 0px 3px 3px rgba(0,0,0,.42)"
        zIndex="2"
      >
        <Box
          width="70px"
          height="90px"
          bgColor="green.300"
          borderRadius="3px"
          bgImage={`url(${card.image_uris.large})`}
          overflow="hidden"
          bgSize="100% 100%"
          position="relative"
        >
          <Text
            fontSize="8px"
            fontWeight="light"
            color="white"
            bgColor="blackAlpha.800"
            letterSpacing="tighter"
          >
            {card.name}
          </Text>
        </Box>
      </Box>
    )
  }
)

export default FieldCard
