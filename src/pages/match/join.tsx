import React, { useState } from 'react'
import { Box, Button, Center, Input, LightMode } from '@chakra-ui/react'

type JoinMatchState = {
  deck: string[]
  fileName: string
}

const JoinMatch: React.FC = () => {
  const [state, setState] = useState<JoinMatchState>({
    deck: [],
    fileName: '',
  })

  function onReaderLoad(event: ProgressEvent<FileReader>, fileName: string) {
    if (event.target?.result) {
      const obj = JSON.parse(`${event.target.result}`)
      setState((prev) => ({ ...prev, deck: obj, fileName }))
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        onReaderLoad(event, file.name)
      }
      reader.readAsText(file)
    }
  }

  return (
    <LightMode>
      <Center width="100vw" height="100vh" bgColor="gray.800" color="gray.800">
        <Box width="270px" bgColor="white" borderRadius="md" p="4">
          <Input placeholder="Match name" variant="filled" _placeholder={{ color: 'gray.400' }} />
          <Input placeholder="display name" variant="filled" _placeholder={{ color: 'gray.400' }} />
          <Input
            as="label"
            display="flex"
            alignItems="center"
            htmlFor="iptDeck"
            variant="filled"
            color={state.fileName ? 'gray.800' : 'gray.400'}
          >
            {state.fileName ? `${state.fileName} (Change deck)` : 'Select your deck'}
          </Input>
          <input type="file" hidden id="iptDeck" onChange={onChange} accept=".json" />
          <Button isFullWidth colorScheme="yellow">
            Join Match
          </Button>
        </Box>
      </Center>
    </LightMode>
  )
}

export default JoinMatch
