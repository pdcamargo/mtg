"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileName = "mtg-database.json";
const databasePath = path_1.default.join(__dirname, "../", fileName);
let cache = [];
class Database {
    constructor() {
        this.cards = [];
        this.loadJson = () => {
            if (cache.length > 0) {
                this.cards = cache;
                return;
            }
            const json = fs_1.default.readFileSync(databasePath, "utf-8");
            const cards = JSON.parse(json);
            if (cards.length > 0) {
                this.cards = cards;
                cache = cards;
            }
        };
        this.find = ({ name }) => this.cards.filter((card) => card.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        this.findByName = (name) => this.cards.filter((card) => card.name.toLowerCase() === name.toLowerCase());
        this.findOne = ({ name }) => this.cards.find((card) => card.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        this.findOneByName = (name) => this.cards.find((card) => card.name.toLowerCase() === name.toLowerCase());
        this.createDeckByList = (list) => {
            const deck = [];
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
        this.loadJson();
    }
}
const database = new Database();
exports.default = database;
//# sourceMappingURL=database.js.map