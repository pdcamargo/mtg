import { Server, Socket } from 'socket.io'
import { v4 as uniqueId } from 'uuid'
import database from './database'

const defaultPlaymatchUrl = 'https://images2.alphacoders.com/157/157160.jpg'
const defaultSleeveColor = '#000000'
const defaultSleeveColorGradient = 'linear-gradient(147deg, #000000 0%, #434343 74%)'

import {
  Match,
  IJoinMatch,
  XY,
  IPlayCard,
  FieldCard,
  IUpdateCardPosition,
  ITapCard,
  IChangeFaceDownCard,
  IDrawCard,
} from '../../declarations'

const defaultXy: XY = {
  x: 100,
  y: 100,
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

  joinMatch = (
    { playerId, displayName, deckList, sleeveColor, sleeveColorGradient, playmatchUrl }: IJoinMatch,
    socket: Socket
  ) => {
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
          hand: [],
          deck,
        },
        socket: socket.id,
        displayName,
        playerIndex: Object.keys(this.match).length,
        playerId,
        playmatchUrl: playmatchUrl || defaultPlaymatchUrl,
        sleeveColor: sleeveColor || defaultSleeveColor,
        sleeveColorGradient: sleeveColorGradient || defaultSleeveColorGradient,
      }
    } else {
      this.match[playerId].socket = socket.id
    }

    this.sendUpdateMatch()
  }

  drawCard = ({ playerId, amount }: IDrawCard) => {
    if (!this.match[playerId]) {
      return
    }

    const cards = this.match[playerId].mtg.deck.splice(0, amount)

    this.match[playerId].mtg.hand.push(...cards)

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
        selector: `card-${uniqueId()}`,
      },
      isFaceDown: false,
      isTapped: false,
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

  tapCard = ({ cardIndex, playerId, isTapped }: ITapCard) => {
    if (!this.match[playerId] || !this.match[playerId].mtg.field[cardIndex]) {
      return
    }

    this.match[playerId].mtg.field[cardIndex].isTapped = isTapped
    this.sendUpdateMatch()
  }

  changeFaceDownCard = (
    { cardIndex, playerId, isFaceDown }: IChangeFaceDownCard,
    socket: Socket
  ) => {
    if (!this.match[playerId] || !this.match[playerId].mtg.field[cardIndex]) {
      return
    }

    this.match[playerId].mtg.field[cardIndex].isFaceDown = isFaceDown

    this.sendUpdateMatch(socket)
  }

  handleSocket = (socket: Socket) => {
    socket.on('joinMatch', (data: IJoinMatch) => {
      this.joinMatch(data, socket)
    })

    socket.on('playCard', (data: IPlayCard) => {
      this.playCard(data)
    })

    socket.on('drawCard', (data: IDrawCard) => {
      this.drawCard(data)
    })

    socket.on('updateCardPosition', (data: IUpdateCardPosition) => {
      this.updateCardPosition(data, socket)
    })

    socket.on('tapCard', (data: ITapCard) => {
      this.tapCard(data)
    })

    socket.on('changeFaceDownCard', (data: IChangeFaceDownCard) => {
      this.changeFaceDownCard(data, socket)
    })
  }
}

export default (io: Server) => new MtgServer(io)
