import type { NextApiRequest, NextApiResponse } from "next";

import { ICard } from "../../declarations";

type Data = {
  cards?: ICard[];
  err?: any;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name } = req.query;
  const cards: ICard[] = [];
  res.status(200).json({ cards });
};
