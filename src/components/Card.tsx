import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

type CardProps = {
  url: string;
};

const Card: React.FC<CardProps> = ({ url }) => {
  const [isTap, setIsTap] = useState(false);

  return (
    <Box
      width="70px"
      height="90px"
      bgColor="green.300"
      borderRadius="4px"
      bgImage={`url(${url})`}
      overflow="hidden"
      bgSize="100% 100%"
      transform={`rotate(${isTap ? "90deg" : "0"})`}
      onDoubleClick={() => setIsTap((prev) => !prev)}
    />
  );
};

export default Card;
