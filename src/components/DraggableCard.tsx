import React, { useCallback, useEffect, useRef, useState } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Card from "./Card";

type DraggableCardProps = {
  id: string;
  playMatchId: string;
  url: string;
};
const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  playMatchId,
  url,
}) => {
  const [, drag, preview] = useDrag(() => ({
    type: "card",
    item: { selector: `#${id}`, playMatchId },
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <Box id={id} ref={drag}>
      <Card url={url} />
    </Box>
  );
};

export default DraggableCard;
