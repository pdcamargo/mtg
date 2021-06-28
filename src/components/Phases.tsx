import React from 'react'
import { Flex, Text, Stack } from '@chakra-ui/react'

const PhaseItem: React.FC<{
  text: string
  isCurrent?: boolean
}> = ({ text, isCurrent }) => {
  const color = isCurrent ? 'white' : 'black'
  const bg = isCurrent
    ? 'linear-gradient(315deg, #c11059 0%, #690000 74%)'
    : 'linear-gradient(315deg, #00d0ff 0%, #49ceaf 74%)'
  const bgHover = isCurrent
    ? 'linear-gradient(315deg, #690000 0%, #c11059 74%)'
    : 'linear-gradient(315deg, #49ceaf 0%, #00d0ff 74%)'

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      border="solid 1px"
      borderColor="blackAlpha.500"
      borderRadius="50%"
      bgColor="blackAlpha.700"
      bgImage={bg}
      width="60px"
      height="60px"
      userSelect="none"
      boxShadow="0px 1px 4px 4px rgba(0,0,0,.11)"
      cursor="pointer"
      _hover={{
        bgImage: bgHover,
        fontWeight: 'bold',
      }}
    >
      <Text
        letterSpacing="widest"
        fontWeight="bold"
        fontSize="x-small"
        textTransform="uppercase"
        color={color}
      >
        {text}
      </Text>
    </Flex>
  )
}

const Phases: React.FC = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <PhaseItem text="Untap" isCurrent />
      <PhaseItem text="Upkeep" />
      <PhaseItem text="Draw" />
      <PhaseItem text="Main 1" />
      <PhaseItem text="Battle" />
      <PhaseItem text="Main 2" />
      <PhaseItem text="End" />
    </Stack>
  )
}

export default Phases
