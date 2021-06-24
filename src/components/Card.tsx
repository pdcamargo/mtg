import React, { useState } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type CardProps = {
  id?: string
  url: string
  position?: BoxProps['position']
  coordinates?: {
    x: number
    y: number
  }
  positionStrategy?: 'absolute' | 'translate'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ id, position, coordinates = { x: 0, y: 0 }, url, positionStrategy = 'absolute' }, ref) => {
    const [isTap, setIsTap] = useState(false)

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
        width="70px"
        height="90px"
        bgColor="green.300"
        borderRadius="4px"
        bgImage={`url(${url})`}
        overflow="hidden"
        bgSize="100% 100%"
        transition="transform ease .75s"
        transform={`rotate(${isTap ? '90deg' : '0'}) ${translate}`}
        onDoubleClick={() => setIsTap((prev) => !prev)}
        position={position}
        style={style}
      />
    )
  }
)

export default Card
