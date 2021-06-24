import { Offset, XY } from '../../../declarations'

export const getXYByIndex = (card: Offset, client: XY) => ({
  0: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - playmat.offsetHeight * 2,
  }),
  1: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - card.offsetHeight / 2 - playmat.offsetWidth,
  }),
  2: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - playmat.offsetHeight * 2,
  }),
  3: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - card.offsetHeight / 2 - playmat.offsetWidth,
  }),
})

export const getPlaymats = () =>
  [...Array(4)]
    .map((_, idx) => idx)
    .map((id) => document.querySelector(`[data-playmat="${id}"]`) as HTMLDivElement)
