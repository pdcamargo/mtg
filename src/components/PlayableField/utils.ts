import { Offset, XY } from '../../../declarations'

const applyOffset = ({ x, y }: XY): XY => {
  return {
    x: x + 110,
    y: y + 300,
  }
}

export const getXYByIndex = (card: Offset, client: XY) => ({
  0: (playmat: HTMLDivElement) =>
    applyOffset({
      x: client.x + card.offsetWidth - playmat.offsetWidth,
      y: client.y - playmat.offsetHeight * 2,
    }),
  1: (playmat: HTMLDivElement) =>
    applyOffset({
      x: client.x + card.offsetWidth - playmat.offsetWidth,
      y: client.y - card.offsetHeight / 2 - playmat.offsetWidth,
    }),
  2: (playmat: HTMLDivElement) =>
    applyOffset({
      x: client.x + card.offsetWidth - playmat.offsetWidth,
      y: client.y - playmat.offsetHeight * 2,
    }),
  3: (playmat: HTMLDivElement) =>
    applyOffset({
      x: client.x + card.offsetWidth - playmat.offsetWidth,
      y: client.y - card.offsetHeight / 2 - playmat.offsetWidth,
    }),
})

export const getPlaymats = () =>
  [...Array(4)]
    .map((_, idx) => idx)
    .map((id) => document.querySelector(`[data-playmat="${id}"]`) as HTMLDivElement)
