import React, { MouseEvent, useState } from "react";
import { Gem, Mine } from "src/assets";
import { useGameContext } from "src/state/context/GameContext";
import styled from "styled-components";
import { designVariables } from "../../styles/globalVariables";
import gemAudio from "src/assets/gem.mp3";
import mineAudio from "src/assets/mine.mp3";

interface TileProps {
  width: number;
  onClick?: (id: number) => void;
  id: number;
  mine?: boolean;
  reveal: boolean;
}

const playGem = () => {
  new Audio(gemAudio).play();
};
const playMine = () => {
  new Audio(mineAudio).play();
};
export const Tile = (props: TileProps) => {
  const { revealedTiles, mines } = useGameContext();
  const [disable, setDisable] = useState(false);
  const handleClick = (e: MouseEvent, id: number) => {
    if (props.onClick) {
      props.onClick(id);
    }
    if (mines.includes(id)) {
      playMine();
      return;
    }
    playGem();
    setDisable(true);
  };
  const showImage = revealedTiles.find((t) => t === props.id);
  console.log(showImage, "id", props.id, "revealed tiles", revealedTiles);
  return (
    <StyledTile
      id={props.id.toString()}
      width={props.width}
      onClick={(e: MouseEvent) => handleClick(e, props.id)}
      reveal={props.reveal}
    >
      {!props.mine ? (
        <Gem
          className={showImage ? "show" : ""}
          width={`${props.width * 0.5}rem`}
          height={`${props.width * 0.5}rem`}
        />
      ) : (
        <Mine
          className={showImage ? "show" : ""}
          width={`${props.width * 0.5}rem`}
          height={`${props.width * 0.5}rem`}
        />
      )}
    </StyledTile>
  );
};

const StyledTile = styled.div<{
  width: number;
  reveal: boolean;
}>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.width}rem;
  background: ${designVariables.palette.dark400};
  transition: ${designVariables.transition};
  &:hover {
    cursor: pointer;
    background: ${designVariables.palette.dark200};
    transform: translateY(-2px);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  svg {
    opacity: 0;
    transition: ${designVariables.transition};
    &.show {
      opacity: 1;
      background: transparent;
    }
    ${(props) => props.reveal && { opacity: 0.2, background: "transparent" }}
  }
`;
