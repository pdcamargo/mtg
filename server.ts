import next from 'next'
import express from 'express'
import { createServer } from 'http'
import { Server as IoServer } from 'socket.io'
import mtgServer from './src/mtg-server'

const app = express()
const server = createServer(app)
const io = new IoServer(server)

mtgServer(io)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const port = process.env.PORT || 3000
nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, () => {
    console.log(`app listening at ${port}`)
  })
})
