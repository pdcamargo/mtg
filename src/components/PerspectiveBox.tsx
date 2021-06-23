import { Box } from "@chakra-ui/react";
import React from "react";
import useWindowSize from "../hooks/useWindowSize";

type PerspectiveBoxProps = {
  perspective?: string;
};

const PerspectiveBox: React.FC<PerspectiveBoxProps> = ({
  perspective = "2640px",
  children,
}) => {
  const { height } = useWindowSize();

  return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <Box
        style={{
          perspective,
        }}
      >
        <Box
          transform={`rotateX(56deg) translateX(-50%) translateY(3%)`}
          position="absolute"
          left="50%"
          top="50%"
          width="1360px"
          height="720px"
          style={{
            zoom: height <= 750 ? 0.95 : 1.2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PerspectiveBox;
