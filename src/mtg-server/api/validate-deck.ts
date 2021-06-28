import database from '../database'
import { ICard } from '../../../declarations'
import { Request, Response } from 'express'

type Data = {
  deck: ICard[]
  invalidCards?: string[]
}

type Body = {
  list: string[]
}

export default async (req: Request, res: Response<Data>) => {
  // if (req.method !== 'POST') {
  //   return res.status(500).end()
  // }

  const { list }: Body = req.body || { list: [] }

  const deck = list
    .map((name) => {
      const quantity = name.split(' ')[0]
      const cardName = name.replace(`${quantity} `, '')

      return database.findOneByName(cardName)
    })
    .filter(Boolean) as ICard[]

  return res.json({
    deck,
    invalidCards: list.filter((name) => {
      const quantity = name.split(' ')[0]
      const cardName = name.replace(`${quantity} `, '')

      return !deck.map((card) => card.name.toLowerCase()).includes(cardName.toLowerCase())
    }),
  })
}
