import React from 'react'
import { useDrop } from 'react-dnd'

import Table from '../Table'
import PlayMatch from '../PlayMatch'
import PerspectiveBox from '../PerspectiveBox'
import FieldCard from '../FieldCard'
import DraggableCard, { DraggableCardItemType } from '../DraggableCard'

import { usePlayer, useMethods, useOpponents, useMatch } from '../../providers/MatchProvider/hooks'
import { FieldCardPosition, XY } from '../../../declarations'

import { getPlaymats, getXYByIndex } from './utils'
import Phases from '../Phases'
import { Box } from '@chakra-ui/react'
import Lifes from '../Lifes'

let updatedPosition: {
  cardIndex: number
  position: FieldCardPosition
}

const PlayableField: React.FC = () => {
  const player = usePlayer()
  const match = useMatch()
  const opponents = useOpponents()
  const { updateCardPosition, tapCard } = useMethods()

  const [, drop] = useDrop(
    () => ({
      accept: 'card',
      hover(item: DraggableCardItemType, monitor) {
        const xy = monitor.getClientOffset() as XY

        const card = document.getElementById(item.id)

        if (!card) {
          return
        }

        const playmats = getPlaymats()

        const cardOffset = {
          offsetHeight: card.offsetHeight,
          offsetWidth: card.offsetWidth,
        }
        const xyObj = getXYByIndex(cardOffset, xy)

        const updatedPositionData: FieldCardPosition = {
          0: xyObj[0](playmats[0]),
          1: xyObj[1](playmats[1]),
          2: xyObj[2](playmats[2]),
          3: xyObj[3](playmats[3]),
        }

        updatedPosition = {
          cardIndex: item.cardIndex,
          position: updatedPositionData,
        }

        const left = `${updatedPositionData['0'].x}`
        const top = `${updatedPositionData['0'].y}`

        card.style.left = `${left}px`
        card.style.top = `${top}px`
      },
      drop() {
        if (updatedPosition) {
          updateCardPosition({
            cardIndex: updatedPosition.cardIndex,
            playerId: player.playerId,
            position: updatedPosition.position,
          })
        }
      },
    }),
    [player, updateCardPosition]
  )

  return (
    <div ref={drop}>
      <PerspectiveBox>
        <Table>
          <PlayMatch
            size="lg"
            url={player.playmatchUrl}
            data-playmat="0"
            displayName={player.displayName}
            playerId={player.playerId}
          >
            <Box pos="absolute" left="50%" transform="translateX(-50%)" top="-70px">
              <Phases />
            </Box>

            <Box pos="absolute" left="50%" transform="translateX(-50%)" top="-260px">
              <Lifes
                players={Object.keys(match).map((id) => ({
                  displayName: match[id].displayName,
                  life: 30 + parseInt(`${Math.random() * 10}`),
                }))}
              />
            </Box>

            {player.mtg.field.map((fieldCard, cardIndex) => (
              <DraggableCard
                key={fieldCard.dom.selector}
                id={fieldCard.dom.selector}
                card={fieldCard.card}
                cardIndex={cardIndex}
                isTapped={fieldCard.isTapped}
                sleeveColor={player.sleeveColor}
                sleeveColorGradient={player.sleeveColorGradient}
                onTapCard={() => {
                  tapCard({
                    cardIndex,
                    isTapped: !fieldCard.isTapped,
                    playerId: player.playerId,
                  })
                }}
                initialPosition={fieldCard.dom.position[0]}
              />
            ))}
          </PlayMatch>

          {opponents.map((player, idx) => (
            <PlayMatch
              size="lg"
              url={
                player?.match?.playmatchUrl ||
                'https://media.magic.wizards.com/images/wallpaper/thrill-of-possibility_ma_stx_1920x1080_wallpaper.jpg'
              }
              key={`data-playmat=${idx + 1}`}
              data-playmat={idx + 1}
              displayName={player?.match?.displayName}
              playerId={player?.match?.playerId}
            >
              {player?.match?.mtg.field.map((fieldCard) => (
                <FieldCard
                  key={fieldCard.dom.selector}
                  id={fieldCard.dom.selector}
                  card={fieldCard.card}
                  isTapped={fieldCard.isTapped}
                  sleeveColor={`${player.match?.sleeveColor}`}
                  sleeveColorGradient={`${player.match?.sleeveColorGradient}`}
                  position="absolute"
                  positionStrategy="translate"
                  coordinates={{
                    x: fieldCard.dom.position[player.idx as keyof FieldCardPosition].x,
                    y: fieldCard.dom.position[player.idx as keyof FieldCardPosition].y,
                  }}
                />
              ))}
            </PlayMatch>
          ))}
        </Table>
      </PerspectiveBox>
    </div>
  )
}

export default PlayableField
