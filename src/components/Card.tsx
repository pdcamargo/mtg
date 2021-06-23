import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

type CardProps = {
  id?: string;
  url: string;
  position?: any;
  style?: {
    left: string;
    top: string;
  };
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ id, position, style, url }, ref) => {
    const [isTap, setIsTap] = useState(false);

    return (
      <Box
        ref={ref}
        id={id}
        width="70px"
        height="90px"
        bgColor="green.300"
        borderRadius="4px"
        bgImage={`url(${url})`}
        overflow="hidden"
        bgSize="100% 100%"
        transform={`rotate(${isTap ? "90deg" : "0"})`}
        onDoubleClick={() => setIsTap((prev) => !prev)}
        style={style}
        position={position}
      />
    );
  },
);

export default Card;
