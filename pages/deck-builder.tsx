import React, { useEffect, useState } from "react";
import { Box, Flex, Textarea, Button, Text } from "@chakra-ui/react";

import usePost from "../src/hooks/usePost";

import { ICard } from "../declarations";

function downloadObjectAsJson(exportObj: any, exportName: string) {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

type Data = {
  cards: ICard[];
};
type ValidateDeckResponse = {
  invalidCards: string[];
  valid: boolean;
};
const DeckBuilder: React.FC = () => {
  const [validatedDeck, loadingState, validateList] =
    usePost<ValidateDeckResponse>("/api/validate-deck");
  const [rawList, setRawList] = useState("");
  const [list, setList] = useState("");

  const mapNames = (cardName: string, idx: number) => {
    if (!Boolean(cardName)) {
      return "";
    }

    const firstChar = cardName.split(" ")[0];
    const isFirstCharNumber = !isNaN(+firstChar);

    if (isFirstCharNumber) {
      return cardName;
    }

    return `1 ${cardName}`;
  };

  const findInvalidCards = (cardName: string) =>
    validatedDeck?.invalidCards.includes(cardName);

  useEffect(() => {
    setList(() => {
      const cardNames = rawList.split("\n");

      if (cardNames.length === 0) {
        return "";
      }

      return cardNames.map(mapNames).join("\n");
    });
  }, [rawList]);

  const invalidCardNames = rawList
    .split("\n")
    .filter(Boolean)
    .map(mapNames)
    .filter(findInvalidCards);

  return (
    <Flex width="100vw" height="100vh">
      <Textarea
        width="100%"
        height="100%"
        variant="filled"
        borderRadius="0"
        onChange={(e) => setRawList((e.target as any).value)}
        value={rawList}
      />
      <Box
        width="350px"
        height="100%"
        padding="4"
        borderLeftWidth="2px"
        borderLeftStyle="dashed"
        borderLeftColor="blackAlpha.700"
      >
        <Button
          mb="4"
          onClick={() => {
            validateList({
              list: rawList.split("\n").filter(Boolean).map(mapNames),
            });
          }}
          isLoading={loadingState === "fetching"}
          loadingText="Validating Deck"
        >
          Validar deck
        </Button>
        <Box fontWeight="bold" mb="2">
          {invalidCardNames.length > 0 ? (
            <>Invalid cards ({invalidCardNames.length}):</>
          ) : (
            rawList.split("\n").filter(Boolean).map(mapNames).length > 0 && (
              <Box>
                <Text>Valid Deck</Text>
                <Button
                  onClick={() => {
                    downloadObjectAsJson(
                      rawList.split("\n").filter(Boolean).map(mapNames),
                      "deck",
                    );
                  }}
                >
                  Download Deck
                </Button>
              </Box>
            )
          )}
        </Box>

        {invalidCardNames.map((cardName, idx) => (
          <Box
            key={idx}
            mb="1"
            color="red.500"
            fontWeight="bold"
            fontSize="sm"
            textTransform="uppercase"
            borderBottom="solid 1px"
            borderColor="whiteAlpha.200"
          >
            {cardName}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default DeckBuilder;
