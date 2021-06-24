import { Server, Socket } from 'socket.io'
import { v4 as uniqueId } from 'uuid'
import database from './database'

import { Match, IJoinMatch, XY, IPlayCard, FieldCard, IUpdateCardPosition } from '../declarations'

const defaultXy: XY = {
  x: 150,
  y: 150,
}

class MtgServer {
  match: Match = {}

  constructor(private readonly io: Server) {
    io.on('connection', this.handleSocket)
  }

  get numberOfPlayers() {
    return Object.keys(this.match).length
  }

  get hasSlotsAvailable() {
    return this.numberOfPlayers < 4
  }

  sendUpdateMatch = (socket?: Socket) => {
    const emitter = socket || this.io

    emitter.to('match').emit('updateMatch', this.match)
  }

  joinMatch = ({ playerId, displayName, deckList }: IJoinMatch, socket: Socket) => {
    if (!this.hasSlotsAvailable && !this.match[playerId]) {
      socket.emit('matchFull')

      return
    }

    socket.join('match')

    const deck = database.createDeckByList(deckList)

    if (!this.match[playerId]) {
      this.match[playerId] = {
        mtg: {
          exile: [],
          field: [],
          grave: [],
          hand: deck,
          deck,
        },
        socket: socket.id,
        displayName,
        playerIndex: Object.keys(this.match).length,
        playerId,
      }
    } else {
      this.match[playerId].socket = socket.id
    }

    this.sendUpdateMatch()
  }

  playCard = ({ playerId, cardIndex }: IPlayCard) => {
    if (!this.match[playerId]) {
      return
    }
    if (!this.match[playerId].mtg.hand[cardIndex]) {
      return
    }

    const card = this.match[playerId].mtg.hand.splice(cardIndex, 1)?.[0]

    if (!card) {
      return
    }

    const fieldCard: FieldCard = {
      card,
      dom: {
        position: {
          '0': defaultXy,
          '1': defaultXy,
          '2': defaultXy,
          '3': defaultXy,
        },
        selector: uniqueId(),
      },
      isFaceDown: false,
      isTap: false,
    }

    this.match[playerId].mtg.field.push(fieldCard)
    this.sendUpdateMatch()
  }

  updateCardPosition = ({ cardIndex, playerId, position }: IUpdateCardPosition, socket: Socket) => {
    if (!this.match[playerId] || !this.match[playerId].mtg.field[cardIndex]) {
      return
    }

    this.match[playerId].mtg.field[cardIndex].dom.position = position

    this.sendUpdateMatch(socket)
  }

  handleSocket = (socket: Socket) => {
    socket.on('joinMatch', (data: IJoinMatch) => {
      this.joinMatch(data, socket)
    })

    socket.on('playCard', (data: IPlayCard) => {
      this.playCard(data)
    })

    socket.on('updateCardPosition', (data: IUpdateCardPosition) => {
      this.updateCardPosition(data, socket)
    })
  }
}

module.exports = (io: Server) => new MtgServer(io)
