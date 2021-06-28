import { Match } from '../../../declarations'

const posByIdx: Record<number, [number, number, number, string]> = {
  0: [-1, 3, -1, '>'],
  1: [2, -2, 4, '<'],
  2: [1, -3, 4, '<'],
}

export const getOpponentByPos = (match: Match, playerId: string) => (pos: number) => {
  const playerIdx = match[playerId].playerIndex
  const keys = Object.keys(match).filter((id) => id !== playerId)

  const idx = keys.findIndex((id) => {
    const values = posByIdx[pos]
    const operator = values[3]

    const firstValue = playerIdx + values[0]
    const secondValue = playerIdx + values[1]

    const condition = operator === '>' ? firstValue > values[2] : firstValue < values[2]

    return match[id].playerIndex === (condition ? firstValue : secondValue)
  })

  return {
    idx,
    match: match?.[keys[idx]],
  }
}
