import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import Table from "../src/components/Table";
import PlayMatch from "../src/components/PlayMatch";
import PerspectiveBox from "../src/components/PerspectiveBox";
import SocketProvider from "../src/providers/Socket";
import MatchProvider, { useMatch } from "../src/providers/Match";
import { ICard, FieldCardPosition } from "../declarations";
import Card from "../src/components/Card";

const Drag: React.FC<{
  id: string;
  card: ICard;
  initialPosition: XY;
}> = ({ id, card, initialPosition }) => {
  const [, drag, preview] = useDrag(
    () => ({
      type: "card",
      item: { id },
    }),
    [id],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <Card
      id={id}
      ref={drag}
      url={card.image_uris.border_crop}
      position="absolute"
      style={{
        left: `${initialPosition.x}px`,
        top: `${initialPosition.y}px`,
      }}
    />
  );
};

const url4 =
  "https://media.magic.wizards.com/images/featured/EN_UR01PortraitPost.jpg";

type XY = {
  x: number;
  y: number;
};

type Offset = {
  offsetWidth: number;
  offsetHeight: number;
};

const getXYByIndex = (card: Offset, client: XY) => ({
  0: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - playmat.offsetHeight * 2,
  }),
  1: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - card.offsetHeight / 2 - playmat.offsetWidth,
  }),
  2: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - playmat.offsetHeight * 2,
  }),
  3: (playmat: HTMLDivElement) => ({
    x: client.x + card.offsetWidth - playmat.offsetWidth,
    y: client.y - card.offsetHeight / 2 - playmat.offsetWidth,
  }),
});

const getPlaymats = () =>
  [...Array(4)]
    .map((_, idx) => idx)
    .map(
      (id) =>
        document.querySelector(`[data-playmat="${id}"]`) as HTMLDivElement,
    );

const Droppable: React.FC = () => {
  const { match, playerId, updateCardPosition } = useMatch();

  const [, drop] = useDrop(
    () => ({
      accept: "card",
      hover(item: { id: string; playMatchId: string }, monitor) {
        const xy = monitor.getClientOffset() as XY;

        const card = document.getElementById(item.id);

        if (!card) {
          return;
        }

        const playmats = getPlaymats();

        const cardOffset = {
          offsetHeight: card.offsetHeight,
          offsetWidth: card.offsetWidth,
        };
        const xyObj = getXYByIndex(cardOffset, xy);

        const updatedPositionData: FieldCardPosition = {
          0: xyObj[0](playmats[0]),
          1: xyObj[1](playmats[1]),
          2: xyObj[2](playmats[2]),
          3: xyObj[3](playmats[3]),
        };

        const cardIndex = match[playerId].mtg.field.findIndex(
          (fieldCard) => fieldCard.dom.selector === item.id,
        );

        updateCardPosition({
          cardIndex,
          playerId,
          position: updatedPositionData,
        });

        card.style.left = `${updatedPositionData["0"].x}px`;
        card.style.top = `${updatedPositionData["0"].y}px`;
      },
    }),
    [playerId, match, updateCardPosition],
  );

  const keys = Object.keys(match).filter((id) => id !== playerId);
  const playerIdx = match[playerId].playerIndex;

  const leftPlayerId = keys.findIndex((id) => {
    return (
      match[id].playerIndex ===
      (playerIdx - 1 > -1 ? playerIdx - 1 : playerIdx + 3)
    );
  });

  const frontPlayerId = keys.findIndex((id) => {
    return (
      match[id].playerIndex ===
      (playerIdx + 2 < 4 ? playerIdx + 2 : playerIdx - 2)
    );
  });

  const rightPlayerId = keys.findIndex((id) => {
    return (
      match[id].playerIndex ===
      (playerIdx + 1 < 4 ? playerIdx + 1 : playerIdx - 3)
    );
  });

  const leftPlayer = {
    idx: playerIdx - 1 > -1 ? playerIdx - 1 : playerIdx + 3,
    match: match?.[keys[leftPlayerId]],
  };
  const frontPlayer = {
    idx: playerIdx + 2 < 4 ? playerIdx + 2 : playerIdx - 2,
    match: match?.[keys[frontPlayerId]],
  };
  const rightPlayer = {
    idx: playerIdx + 1 < 4 ? playerIdx + 1 : playerIdx - 3,
    match: match?.[keys[rightPlayerId]],
  };

  const players = [leftPlayer, frontPlayer, rightPlayer];

  return (
    <div ref={drop}>
      <PerspectiveBox>
        <Table>
          <PlayMatch size="lg" url={url4} data-playmat="0">
            {match[playerId].mtg.field.map((fieldCard) => (
              <Drag
                key={fieldCard.dom.selector}
                id={fieldCard.dom.selector}
                card={fieldCard.card}
                initialPosition={fieldCard.dom.position[0]}
              />
            ))}
          </PlayMatch>

          {players.map((player, idx) => (
            <PlayMatch
              size="lg"
              url={url4}
              key={`data-playmat=${idx + 1}`}
              data-playmat={idx + 1}
            >
              {player?.match?.mtg.field.map((fieldCard) => (
                <Card
                  key={fieldCard.dom.selector}
                  id={fieldCard.dom.selector}
                  url={fieldCard.card.image_uris.border_crop}
                  position="absolute"
                  style={{
                    left: `${
                      fieldCard.dom.position[
                        player.idx as keyof FieldCardPosition
                      ].x
                    }px`,
                    top: `${
                      fieldCard.dom.position[
                        player.idx as keyof FieldCardPosition
                      ].y
                    }px`,
                  }}
                />
              ))}
            </PlayMatch>
          ))}
        </Table>
      </PerspectiveBox>
    </div>
  );
};

const Playground: React.FC = () => {
  return (
    <SocketProvider>
      <MatchProvider>
        <Droppable />
      </MatchProvider>
    </SocketProvider>
  );
};

export default Playground;
