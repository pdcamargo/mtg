import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { ICard } from '../../declarations'
import { usePlayer, useMethods } from '../providers/MatchProvider/hooks'

const CardHand: React.FC<{
  card: ICard
}> = ({ card }) => {
  return (
    <Box
      width="70px"
      height="90px"
      bgSize="100% 100%"
      bgColor="green.400"
      bgImage={`url(${card.image_uris.border_crop})`}
      display="inline-flex"
      transition="all ease .15s"
      _hover={{
        width: 280,
        height: 360,
      }}
    />
  )
}

const Hand: React.FC = () => {
  const player = usePlayer()
  const { playCard } = useMethods()

  const cards = player.mtg.hand

  return (
    <Box position="fixed" bottom="0" width="100%" left="0" display="flex" justifyContent="center">
      <Stack display="inline-flex" alignItems="flex-end" spacing={1} direction="row">
        {cards.map((card, idx) => (
          <Box
            key={`${card.id}${idx}`}
            onDoubleClick={() => {
              playCard(idx)
            }}
          >
            <CardHand card={card} />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default Hand
