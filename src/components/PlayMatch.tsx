import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type PlayMatchProps = {
  size: 'sm' | 'md' | 'lg'
  url: string
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

const PlayMatch: React.FC<PlayMatchProps> = ({ size, url, children, ...props }) => {
  return (
    <Box
      {...playMatchPropsBySize[size]}
      bgColor="gray.500"
      position="relative"
      bgImage={`url(${url})`}
      bgSize="100% 100%"
      borderRadius="5px"
      {...props}
    >
      {children}
    </Box>
  )
}

export default PlayMatch
