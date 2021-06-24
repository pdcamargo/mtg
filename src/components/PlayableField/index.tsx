import React from 'react'
import { useDrop } from 'react-dnd'

import Table from '../Table'
import PlayMatch from '../PlayMatch'
import PerspectiveBox from '../PerspectiveBox'
import Card from '../Card'
import DraggableCard from '../DraggableCard'

import { useMatch } from '../../providers/Match'
import { FieldCardPosition, XY } from '../../../declarations'

import { getPlaymats, getXYByIndex } from './utils'

const url4 = 'https://media.magic.wizards.com/images/featured/EN_UR01PortraitPost.jpg'

let updatedPosition: {
  cardIndex: number
  position: FieldCardPosition
}

const PlayableField: React.FC = () => {
  const { match, playerId, updateCardPosition, opponents } = useMatch()

  const [, drop] = useDrop(
    () => ({
      accept: 'card',
      hover(item: { id: string; playMatchId: string }, monitor) {
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

        const cardIndex = match[playerId].mtg.field.findIndex(
          (fieldCard) => fieldCard.dom.selector === item.id
        )

        updatedPosition = {
          cardIndex,
          position: updatedPositionData,
        }

        card.style.left = `${updatedPositionData['0'].x}px`
        card.style.top = `${updatedPositionData['0'].y}px`
      },
      drop() {
        if (updatedPosition) {
          updateCardPosition({
            cardIndex: updatedPosition.cardIndex,
            playerId,
            position: updatedPosition.position,
          })
        }
      },
    }),
    [playerId, match, updateCardPosition]
  )

  return (
    <div ref={drop}>
      <PerspectiveBox>
        <Table>
          <PlayMatch size="lg" url={url4} data-playmat="0">
            {match[playerId].mtg.field.map((fieldCard) => (
              <DraggableCard
                key={fieldCard.dom.selector}
                id={fieldCard.dom.selector}
                card={fieldCard.card}
                initialPosition={fieldCard.dom.position[0]}
              />
            ))}
          </PlayMatch>

          {opponents.map((player, idx) => (
            <PlayMatch size="lg" url={url4} key={`data-playmat=${idx + 1}`} data-playmat={idx + 1}>
              {player?.match?.mtg.field.map((fieldCard) => (
                <Card
                  key={fieldCard.dom.selector}
                  id={fieldCard.dom.selector}
                  url={fieldCard.card.image_uris.border_crop}
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
