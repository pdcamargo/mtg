import type { NextApiRequest, NextApiResponse } from "next";

import { Card } from "../../declarations";

type Data = {
  cards?: Card[];
  err?: any;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name } = req.query;
  const cards: Card[] = [];
  res.status(200).json({ cards });
};
