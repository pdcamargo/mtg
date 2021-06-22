import { Box } from "@chakra-ui/react";
import React from "react";

const PerspectiveBox: React.FC = ({ children }) => {
  return (
    <Box
      style={{
        perspective: "1320px",
      }}
    >
      <Box
        transform="rotateX(65deg) translate(-50%)"
        position="absolute"
        left="50%"
        top="50%"
        width="100vw"
        height="100vh"
        style={{
          zoom: 0.9,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PerspectiveBox;
