import React from "react";
import styled from "styled-components";
import { Tile } from "./Tile";
import { useGameContext } from "../../state/context/GameContext";

interface TilesProps {
  count: number;
  width: number;
}
export const Tiles = (props: TilesProps) => {
  const { state, onNext, mines } = useGameContext();
  const handleClick = (id: number) => {
    if (onNext) {
      onNext(id);
    }
  };
  //Might not be as performant, potential for improvement.
  const renderTiles = () => {
    const tileArray: React.ReactNode[] = [];
    for (let i = 1; i <= props.count; i++) {
      const tileItem = (
        <Tile
          mine={mines?.includes(i) || false}
          key={i}
          width={props.width}
          id={i}
          reveal={state === "cashout" || state === "busted"}
          onClick={handleClick}
        />
      );
      tileArray.push(tileItem);
    }
    return tileArray;
  };
  return <StyledTiles>{renderTiles()}</StyledTiles>;
};

const StyledTiles = styled.article`
  width: 90%;
  height: 90%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;
