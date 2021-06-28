import React from 'react'
import { Box } from '@chakra-ui/react'

type LifesProps = {
  players: {
    displayName: string
    life: number
  }[]
}

const Lifes: React.FC<LifesProps> = ({ players }) => {
  return (
    <Box
      width="300px"
      height="160px"
      overflow="hidden"
      backgroundColor="#FFF"
      color="#222"
      fontFamily="Courier, monospace"
      fontWeight="normal"
      lineHeight="40px"
      paddingLeft="10px"
      paddingRight="10px"
      paddingY="0"
      backgroundImage="url(https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png), url(https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png)"
      backgroundRepeat="repeat-y, repeat"
      borderRadius="4px"
      boxShadow=" 0px 2px 14px rgba(0,0,0,.35)"
      borderTop="1px solid #FFF"
      borderBottom="1px solid #FFF"
      transform="scale(0.8)"
    >
      {players.map((player, idx) => (
        <Box key={`${player.displayName}${idx}`} display="flex" alignItems="center" w="100%">
          <Box
            width="80px"
            fontSize="16px"
            fontWeight="black"
            mr="1"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {player.displayName}
          </Box>
          <Box fontSize="24px">{player.life}</Box>
        </Box>
      ))}
    </Box>
  )
}

export default Lifes
