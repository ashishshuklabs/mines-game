import React from "react";
import { Tiles } from "../tile/Tiles";
import styled from "styled-components";
import { designVariables } from "src/styles/globalVariables";
import { useGameContext } from "src/state/context/GameContext";
interface BoardProps {
  boardWidth: number;
  gridMatrix: number;
}
export const Board = (props: BoardProps) => {
  const tileWidth = props.boardWidth / props.gridMatrix;
  const tileCount = props.gridMatrix * props.gridMatrix;
  const { minesCount, mines, state } = useGameContext();
  console.log(minesCount, mines);
  const disable = state === "busted" || state === "idle" || state === "cashout";
  return (
    <StyledBoard disabled={disable} boardWidth={props.boardWidth}>
      <Tiles count={tileCount} width={tileWidth} />
    </StyledBoard>
  );
};

const StyledBoard = styled.section<{ boardWidth: number; disabled: boolean }>`
  width: calc(${(props) => props.boardWidth}rem + 3rem);
  height: calc(${(props) => props.boardWidth}rem + 3rem);

  background: ${designVariables.palette.dark600};
  margin: 2rem auto;

  ${(props) => props.disabled && { pointerEvents: "none" }};
`;
