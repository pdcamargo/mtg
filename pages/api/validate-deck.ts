import type { NextApiRequest, NextApiResponse } from "next";

import database from "../../mtg-server/database";
import { ICard } from "../../declarations";

type Data = {
  deck: ICard[];
  invalidCards?: string[];
};

type Body = {
  list: string[];
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(500).end();
  }

  const { list }: Body = req.body || {};

  const deck = list
    .map((name) => {
      const quantity = name.split(" ")[0];
      const cardName = name.replace(`${quantity} `, "");

      return database.findOneByName(cardName);
    })
    .filter(Boolean) as ICard[];

  return res.json({
    deck,
    invalidCards: list.filter((name) => {
      const quantity = name.split(" ")[0];
      const cardName = name.replace(`${quantity} `, "");

      return !deck
        .map((card) => card.name.toLowerCase())
        .includes(cardName.toLowerCase());
    }),
  });
};
