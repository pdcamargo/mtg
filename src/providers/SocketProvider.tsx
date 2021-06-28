import React, { createContext, useContext, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

type ContextType = { socket: Socket }

const Context = createContext({} as ContextType)

const SocketProvider: React.FC = ({ children }) => {
  const socket = useRef<Socket>()

  if (!socket.current) {
    socket.current = io()
  }

  return (
    <Context.Provider
      value={{
        socket: socket.current,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSocket = () => {
  const { socket } = useContext(Context)

  return socket
}

export default SocketProvider
