"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("./database"));
const defaultXy = {
    x: 150,
    y: 150,
};
class MtgServer {
    constructor(io) {
        this.io = io;
        this.match = {};
        this.sendUpdateMatch = (socket) => {
            const emitter = socket || this.io;
            emitter.to("match").emit("updateMatch", this.match);
        };
        this.joinMatch = ({ playerId, displayName, deckList }, socket) => {
            if (!this.hasSlotsAvailable && !this.match[playerId]) {
                socket.emit("matchFull");
                return;
            }
            socket.join("match");
            const deck = database_1.default.createDeckByList(deckList);
            if (!this.match[playerId]) {
                this.match[playerId] = {
                    mtg: {
                        exile: [],
                        field: [],
                        grave: [],
                        hand: deck,
                        deck,
                    },
                    socket: socket.id,
                    displayName,
                    playerIndex: Object.keys(this.match).length,
                    playerId,
                };
            }
            else {
                this.match[playerId].socket = socket.id;
            }
            this.sendUpdateMatch();
        };
        this.playCard = ({ playerId, cardIndex }, socket) => {
            var _a;
            if (!this.match[playerId]) {
                return;
            }
            if (!this.match[playerId].mtg.hand[cardIndex]) {
                return;
            }
            const card = (_a = this.match[playerId].mtg.hand.splice(cardIndex, 1)) === null || _a === void 0 ? void 0 : _a[0];
            if (!card) {
                return;
            }
            const fieldCard = {
                card,
                dom: {
                    position: {
                        "0": defaultXy,
                        "1": defaultXy,
                        "2": defaultXy,
                        "3": defaultXy,
                    },
                    selector: uuid_1.v4(),
                },
            };
            this.match[playerId].mtg.field.push(fieldCard);
            this.sendUpdateMatch();
        };
        this.updateCardPosition = ({ cardIndex, playerId, position }, socket) => {
            if (!this.match[playerId] || !this.match[playerId].mtg.field[cardIndex]) {
                return;
            }
            this.match[playerId].mtg.field[cardIndex].dom.position = position;
            this.sendUpdateMatch(socket);
        };
        this.handleSocket = (socket) => {
            socket.on("joinMatch", (data) => {
                this.joinMatch(data, socket);
            });
            socket.on("playCard", (data) => {
                this.playCard(data, socket);
            });
            socket.on("updateCardPosition", (data) => {
                this.updateCardPosition(data, socket);
            });
        };
        io.on("connection", this.handleSocket);
    }
    get numberOfPlayers() {
        return Object.keys(this.match).length;
    }
    get hasSlotsAvailable() {
        return this.numberOfPlayers < 4;
    }
}
module.exports = (io) => new MtgServer(io);
//# sourceMappingURL=index.js.map