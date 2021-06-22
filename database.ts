import fs from "fs";
import path from "path";
import getConfig from "next/config";

import { Card } from "./declarations";

const fileName = "mtg-database.json";

let cache: Card[] = [];

type Filter = {
  name: string;
};

class Database {
  cards: Card[] = [];

  constructor() {
    this.loadJson();
  }

  loadJson = () => {
    if (cache.length > 0) {
      this.cards = cache;
      return;
    }

    const json = fs.readFileSync(
      getConfig().serverRuntimeConfig.databasePath,
      "utf-8",
    );

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
}

const database = new Database();

export default database;
