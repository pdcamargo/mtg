import fs from "fs";
import path from "path";

import { ICard } from "../declarations";

const fileName = "mtg-database.json";
const databasePath = path.join(__dirname, "../", fileName);

let cache: ICard[] = [];

type Filter = {
  name: string;
};

class Database {
  cards: ICard[] = [];

  constructor() {
    this.loadJson();
  }

  loadJson = () => {
    if (cache.length > 0) {
      this.cards = cache;
      return;
    }

    const json = fs.readFileSync(databasePath, "utf-8");

    const cards = JSON.parse(json);

    if (cards.length > 0) {
      this.cards = cards;
      cache = cards;
    }
  };

  find = ({ name }: Filter) =>
    this.cards.filter(
      (card) => card.name.toLowerCase().indexOf(name.toLowerCase()) > -1,
    );
  findByName = (name: string) =>
    this.cards.filter((card) => card.name.toLowerCase() === name.toLowerCase());
  findOne = ({ name }: Filter) =>
    this.cards.find(
      (card) => card.name.toLowerCase().indexOf(name.toLowerCase()) > -1,
    );
  findOneByName = (name: string) =>
    this.cards.find((card) => card.name.toLowerCase() === name.toLowerCase());

  createDeckByList = (list: string[]) => {
    const deck: ICard[] = [];

    console.log({ list });

    list.forEach((cardName) => {
      const qtt = +cardName.split(" ")[0];
      const name = cardName.replace(`${qtt} `, "");

      const card = this.findOneByName(name);

      if (card) {
        [...Array(qtt)].fill("").forEach(() => {
          deck.push(card);
        });
      }
    });

    return deck;
  };
}

const database = new Database();

export default database;
