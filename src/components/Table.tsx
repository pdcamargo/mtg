import React, { memo } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

const propsByIdx: Record<number, BoxProps> = {
  0: {
    transform: 'rotate(0deg) translateX(-50%)',
    bottom: -30,
    left: '50%',
    boxShadow: '0px 6px black, 0px 6px 10px 10px rgba(0,0,0,.35)',
    zIndex: 2,
  },
  1: {
    transform: 'rotate(90deg) translateX(-50%)',
    left: -100,
    top: '50%',
    boxShadow: '6px -3px black, 6px -3px 10px 10px rgba(0,0,0,.35)',
    zIndex: 1,
  },
  2: {
    transform: 'rotate(180deg) translateX(50%)',
    top: -290,
    left: '50%',
    boxShadow: '0px -6px black, 0px -6px 10px 10px rgba(0,0,0,.35)',
    zIndex: 1,
  },
  3: {
    transform: 'rotate(270deg) translateX(50%)',
    right: -100,
    top: '50%',
    boxShadow: '-6px -3px black, -6px -3px 10px 10px rgba(0,0,0,.35)',
    zIndex: 1,
  },
}

const Table: React.FC = memo(({ children }) => {
  return (
    <Box
      width="1360px"
      height="720px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pos="relative"
    >
      <Box position="relative" width="1360px" height="720px">
        {React.Children.map(children, (child, idx) => (
          <Box {...propsByIdx[idx]} display="inline-flex" pos="absolute" borderRadius="5px">
            {child}
            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              // bgColor="whiteAlpha.700"
              pos="absolute"
              left="50%"
              transform="translateX(-50%)"
              top="-100px"
              style={{
                zoom: 1.5,
              }}
            >
              <Card url="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=433124&type=card" />
            </Box> */}
          </Box>
        ))}
      </Box>
    </Box>
  )
})

export default Table
