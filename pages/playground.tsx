import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import Table from "../src/components/Table";
import PlayMatch from "../src/components/PlayMatch";
import PerspectiveBox from "../src/components/PerspectiveBox";

const Drag = () => {
  const [, drag, preview] = useDrag(() => ({
    type: "card",
    item: { selector: 1 },
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <Box data-card="1" width="70px" height="90px" bgColor="red.500" ref={drag}>
      Draggable Item
    </Box>
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
const xyByIndex: Record<
  number,
  (client: XY, playmat: Offset, card: Offset) => { left: string; top: string }
> = {
  0: (client: XY, playmat: Offset, card: Offset) => ({
    left: `${client.x + card.offsetWidth - playmat.offsetWidth}px`,
    top: `${client.y - playmat.offsetHeight * 2}px`,
  }),
  1: (client: XY, playmat: Offset, card: Offset) => ({
    left: `${client.x + card.offsetWidth - playmat.offsetWidth}px`,
    top: `${client.y - card.offsetHeight / 2 - playmat.offsetWidth}px`,
  }),
  2: (client: XY, playmat: Offset, card: Offset) => ({
    left: `${client.x + card.offsetWidth - playmat.offsetWidth}px`,
    top: `${client.y - playmat.offsetHeight * 2}px`,
  }),
  3: (client: XY, playmat: Offset, card: Offset) => ({
    left: `${client.x + card.offsetWidth - playmat.offsetWidth}px`,
    top: `${client.y - card.offsetHeight / 2 - playmat.offsetWidth}px`,
  }),
};

const pages: React.FC = () => {
  const [, drop] = useDrop(
    () => ({
      accept: "card",
      hover(item: { selector: number; playMatchId: string }, monitor) {
        const xy = monitor.getClientOffset() as { x: number; y: number };

        const player0Card = document.querySelector(
          `[data-card="${item.selector}"]`,
        ) as HTMLDivElement;
        const player0Playmat = document.querySelector(
          '[data-playmat="1"]',
        ) as HTMLDivElement;
        const player1Card = document.querySelector(
          '[data-card="2"]',
        ) as HTMLDivElement;
        const player1Playmat = document.querySelector(
          '[data-playmat="2"]',
        ) as HTMLDivElement;
        const player2Card = document.querySelector(
          '[data-card="3"]',
        ) as HTMLDivElement;
        const player2Playmat = document.querySelector(
          '[data-playmat="3"]',
        ) as HTMLDivElement;
        const player3Card = document.querySelector(
          '[data-card="4"]',
        ) as HTMLDivElement;
        const player3Playmat = document.querySelector(
          '[data-playmat="4"]',
        ) as HTMLDivElement;

        player0Card.style.position = "absolute";
        player1Card.style.position = "absolute";
        player2Card.style.position = "absolute";
        player3Card.style.position = "absolute";

        const xy0 = xyByIndex[0](
          xy,
          {
            offsetWidth: player0Playmat.offsetWidth,
            offsetHeight: player0Playmat.offsetHeight,
          },
          {
            offsetWidth: player0Card.offsetWidth,
            offsetHeight: player0Card.offsetHeight,
          },
        );

        const xy1 = xyByIndex[1](
          xy,
          {
            offsetWidth: player1Playmat.offsetWidth,
            offsetHeight: player1Playmat.offsetHeight,
          },
          {
            offsetWidth: player1Card.offsetWidth,
            offsetHeight: player1Card.offsetHeight,
          },
        );

        const xy2 = xyByIndex[2](
          xy,
          {
            offsetWidth: player2Playmat.offsetWidth,
            offsetHeight: player2Playmat.offsetHeight,
          },
          {
            offsetWidth: player2Card.offsetWidth,
            offsetHeight: player2Card.offsetHeight,
          },
        );

        const xy3 = xyByIndex[3](
          xy,
          {
            offsetWidth: player3Playmat.offsetWidth,
            offsetHeight: player3Playmat.offsetHeight,
          },
          {
            offsetWidth: player3Card.offsetWidth,
            offsetHeight: player3Card.offsetHeight,
          },
        );

        player0Card.style.left = xy0.left;
        player0Card.style.top = xy0.top;
        player1Card.style.left = xy1.left;
        player1Card.style.top = xy1.top;
        player2Card.style.left = xy2.left;
        player2Card.style.top = xy2.top;
        player3Card.style.left = xy3.left;
        player3Card.style.top = xy3.top;
      },
    }),
    [],
  );

  return (
    <div ref={drop}>
      <PerspectiveBox>
        <Table>
          <PlayMatch size="lg" url={url4} data-playmat="1">
            <Drag />
          </PlayMatch>
          <PlayMatch size="lg" url={url4} data-playmat="2">
            <Box data-card="2" width="70px" height="90px" bgColor="red.500">
              Draggable Item
            </Box>
          </PlayMatch>
          <PlayMatch size="lg" url={url4} data-playmat="3">
            <Box data-card="3" width="70px" height="90px" bgColor="red.500">
              Draggable Item
            </Box>
          </PlayMatch>

          <PlayMatch size="lg" url={url4} data-playmat="4">
            <Box data-card="4" width="70px" height="90px" bgColor="red.500">
              Draggable Item
            </Box>
          </PlayMatch>
        </Table>
      </PerspectiveBox>
    </div>
  );
};

export default pages;
