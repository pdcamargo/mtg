import React from "react";

import PlayableField from "../src/components/PlayableField";

import MatchProvider from "../src/providers/Match";
import SocketProvider from "../src/providers/Socket";

const Playground: React.FC = () => {
  return (
    <SocketProvider>
      <MatchProvider>
        <PlayableField />
      </MatchProvider>
    </SocketProvider>
  );
};

export default Playground;
