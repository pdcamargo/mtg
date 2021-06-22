import React from "react";
import { Box } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

import PlayMatch from "./PlayMatch";

type DroppablePlayMatchProps = {
  id: string;
  url: string;
};

const DroppablePlayMatch: React.FC<DroppablePlayMatchProps> = ({
  id,
  url,
  children,
}) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "card",
      hover(item: { selector: string; playMatchId: string }, monitor) {
        if (id !== item.playMatchId || !monitor.isOver({ shallow: true })) {
          return;
        }

        const xy = monitor.getClientOffset();
        const el = document.querySelector(item.selector) as HTMLDivElement;
        el.style.zIndex = "2";

        const droppableElement = document.getElementById("droppableElement");
        const realY =
          (xy?.y || 0) - (droppableElement?.getBoundingClientRect().top || 0);

        const realX =
          (xy?.x || 0) - (droppableElement?.getBoundingClientRect().left || 0);

        el.style.position = "absolute";
        el.style.left = `${realX - el.offsetWidth}px`;
        el.style.top = `${realY + el.offsetHeight / 2}px`;
      },
      drop(item) {
        const el = document.querySelector(item.selector) as HTMLDivElement;
        el.style.zIndex = "1";
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [id],
  );

  return (
    <Box
      id="droppableElement"
      ref={drop}
      overflow="hidden"
      boxShadow={
        isOverCurrent
          ? "inset 0px 0px 30px 50px green"
          : "inset 0px 0px 30px 50px #000000"
      }
    >
      <PlayMatch url={url} size="lg">
        {children}
      </PlayMatch>
    </Box>
  );
};

export default DroppablePlayMatch;
