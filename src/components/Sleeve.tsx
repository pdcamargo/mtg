import React from 'react'
import { Box } from '@chakra-ui/react'

const Sleeve: React.FC = ({ children }) => {
  return (
    <Box display="inline-flex" bgColor="pink.400" padding="1px" boxShadow="md">
      <Box width="70px" height="90px">
        {children}
      </Box>
    </Box>
  )
}

export default Sleeve
