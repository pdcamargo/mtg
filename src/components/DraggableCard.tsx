import React, { memo, useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

import FieldCard from './FieldCard'

import { ICard, XY } from '../../declarations'

type DraggableCardProps = {
  id: string
  card: ICard
  cardIndex: number
  initialPosition: XY
  onTapCard?: () => void
  isTapped?: boolean
  sleeveColor: string
  sleeveColorGradient: string
}

export type DraggableCardItemType = {
  id: string
  card: ICard
  cardIndex: number
}

const DraggableCard: React.FC<DraggableCardProps> = memo(
  ({
    id,
    card,
    cardIndex,
    initialPosition,
    onTapCard,
    isTapped,
    sleeveColor,
    sleeveColorGradient,
  }) => {
    const [, drag, preview] = useDrag(
      () => ({
        type: 'card',
        item: { id, card, cardIndex } as DraggableCardItemType,
      }),
      [id, card, cardIndex]
    )

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview])

    return (
      <FieldCard
        canTap
        id={id}
        ref={drag}
        card={card}
        position="absolute"
        isTapped={isTapped}
        onTapCard={onTapCard}
        sleeveColor={sleeveColor}
        sleeveColorGradient={sleeveColorGradient}
        coordinates={{
          x: initialPosition.x,
          y: initialPosition.y,
        }}
      />
    )
  }
)

export default DraggableCard
