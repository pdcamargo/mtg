import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

import Card from "./Card";

const propsByIdx: Record<number, BoxProps> = {
  0: {
    transform: "rotate(0deg) translateX(-50%)",
    bottom: 0,
    left: "50%",
    boxShadow: "0px 6px black",
  },
  1: {
    transform: "rotate(90deg) translateX(-30%)",
    left: 0,
    top: "50%",
    boxShadow: "6px -3px black",
  },
  2: {
    transform: "rotate(180deg) translateX(50%)",
    top: 0,
    left: "50%",
    boxShadow: "0px -6px black",
  },
  3: {
    transform: "rotate(270deg) translateX(30%)",
    right: 0,
    top: "50%",
    boxShadow: "-6px -3px black",
  },
};

const Table: React.FC = ({ children }) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="relative" width="100%" height="100vh">
        {React.Children.map(children, (child, idx) => (
          <Box
            {...propsByIdx[idx]}
            display="inline-flex"
            pos="absolute"
            borderRadius="5px"
          >
            {child}
            <Box
              display="inline-flex"
              pos="absolute"
              right="10px"
              top="10px"
              color="black"
              fontWeight="bold"
            >
              Player {idx}
            </Box>

            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              // bgColor="whiteAlpha.700"
              pos="absolute"
              left="50%"
              transform="translateX(-50%)"
              top="-100px"
              style={{
                zoom: 1.5,
              }}
            >
              <Card url="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=433124&type=card" />
            </Box> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Table;
