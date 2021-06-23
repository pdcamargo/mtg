import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import {
  IJoinMatch,
  IPlayCard,
  IUpdateCardPosition,
  Match,
} from "../../declarations";
import { useSocket } from "./Socket";

type ContextType = {
  match: Match;
  playerId: string;
  updateCardPosition: (data: IUpdateCardPosition) => void;
};

const Context = createContext({} as ContextType);

const decks: Record<string, string[]> = {
  "1": ["1 Island", "1 Swamp", "1 Scion of the Ur-Dragon"],
  "2": ["3 Island"],
  "3": ["3 Swamp"],
  "4": ["3 Scion of the Ur-Dragon"],
};

const MatchProvider: React.FC = ({ children }) => {
  const [match, setMatch] = useState<Match>();
  const socket = useSocket();

  const { query } = useRouter();

  const playerId =
    typeof query.playerId !== "undefined" ? `${query.playerId}` : null;

  useEffect(() => {
    if (!playerId) {
      return undefined;
    }

    const data: IJoinMatch = {
      deckList: decks[playerId],
      displayName: "Patrick Dias",
      playerId,
    };

    socket.emit("joinMatch", data);

    socket.on("updateMatch", (match: Match) => {
      setMatch(match);
    });

    const handler = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.shiftKey && e.key.toLowerCase() === "d") {
        const playCardData: IPlayCard = {
          cardIndex: 0,
          playerId,
        };

        socket.emit("playCard", playCardData);
      }
    };

    window.addEventListener("keypress", handler);

    return () => {
      window.removeEventListener("keypress", handler);
    };
  }, [playerId]);

  useEffect(() => {
    console.log(match);
  }, [match]);

  const updateCardPosition = useCallback(
    (data: IUpdateCardPosition) => {
      socket.emit("updateCardPosition", data);

      console.log(data);
    },
    [socket],
  );

  return (
    <>
      {match && playerId && (
        <Context.Provider value={{ match, playerId, updateCardPosition }}>
          {children}
        </Context.Provider>
      )}
    </>
  );
};

export const useMatch = () => {
  const context = useContext(Context);

  return context;
};

export default MatchProvider;
