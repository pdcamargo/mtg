import React, { useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

import Card from './Card'

import { ICard, XY } from '../../declarations'

type DraggableCardProps = {
  id: string
  card: ICard
  initialPosition: XY
}

export type DraggableCardItemType = {
  id: string
  card: ICard
}

const DraggableCard: React.FC<DraggableCardProps> = ({ id, card, initialPosition }) => {
  const [, drag, preview] = useDrag(
    () => ({
      type: 'card',
      item: { id, card } as DraggableCardItemType,
    }),
    [id]
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <Card
      id={id}
      ref={drag}
      url={card.image_uris.border_crop}
      position="absolute"
      coordinates={{
        x: initialPosition.x,
        y: initialPosition.y,
      }}
    />
  )
}

export default DraggableCard
