import React from "react";

import Table from "../../src/components/Table";
import PerspectiveBox from "../../src/components/PerspectiveBox";
import Card from "../../src/components/Card";
import DraggableCard from "../../src/components/DraggableCard";
import DroppablePlayMatch from "../../src/components/DroppablePlayMatch";
import PlayMatch from "../../src/components/PlayMatch";

const url1 =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c3162551-b1f8-456c-915f-acf24e22777f/d83f955-ea346576-a213-41f7-a5ea-667ac7d9a296.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzMTYyNTUxLWIxZjgtNDU2Yy05MTVmLWFjZjI0ZTIyNzc3ZlwvZDgzZjk1NS1lYTM0NjU3Ni1hMjEzLTQxZjctYTVlYS02NjdhYzdkOWEyOTYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.L5JkanBD1qgp4a8Kt46PUnG9CKBW93z1OLPLdsF6VSQ";
const url2 =
  "https://images-na.ssl-images-amazon.com/images/I/81720VMRu8L._AC_SL1500_.jpg";
const url3 = "https://pbs.twimg.com/media/CJra_jVWUAAIBwi.jpg";
const url4 =
  "https://media.magic.wizards.com/images/featured/EN_UR01PortraitPost.jpg";

const nantukoElder =
  "https://c1.scryfall.com/file/scryfall-cards/large/front/5/c/5c0a4e6e-cc4e-43d5-aece-f009e117366a.jpg?1562911994";
const tropicalIsland =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=1382&type=card";
const snowCoveredIsland =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=121130&type=card";
const snowCoveredMountain =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=503902&type=card";
const island =
  "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=524950&type=card";

const Match: React.FC = () => {
  return (
    <PerspectiveBox>
      <Table>
        <DroppablePlayMatch url={url1} id="playmatch-1">
          <DraggableCard
            url={nantukoElder}
            id="card-1"
            playMatchId="playmatch-1"
          />
          <DraggableCard
            url={nantukoElder}
            id="card-2"
            playMatchId="playmatch-1"
          />
          <DraggableCard
            url={nantukoElder}
            id="card-3"
            playMatchId="playmatch-1"
          />
          <DraggableCard
            url={tropicalIsland}
            id="card-4"
            playMatchId="playmatch-1"
          />
        </DroppablePlayMatch>
        <PlayMatch size="lg" url={url2}>
          <Card url={nantukoElder} />
        </PlayMatch>
        <PlayMatch url={url3} size="lg">
          <Card url={nantukoElder} />
        </PlayMatch>
        <PlayMatch url={url4} size="lg">
          <Card url={nantukoElder} />
        </PlayMatch>
      </Table>
    </PerspectiveBox>
  );
};

export default Match;
