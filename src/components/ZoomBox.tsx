import React from 'react'
import { Box } from '@chakra-ui/react'

type ZoomBoxProps = {
  zoom: number
}
const ZoomBox: React.FC<ZoomBoxProps> = ({ children, zoom }) => {
  return <Box transform={`scale(${zoom})`}>{children}</Box>
}

export default ZoomBox
