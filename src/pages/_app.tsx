import type { AppProps } from 'next/app'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        backgroundColor: 'rgb(84,92,97)',
        background: 'radial-gradient(circle, rgba(84,92,97,1) 0%, rgba(23,41,48,1) 100%)',
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </ChakraProvider>
  )
}
export default MyApp
