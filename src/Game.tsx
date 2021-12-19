import React, { MouseEvent, useEffect, useState } from "react";
import { Board } from "src/components/board/Board";
import styled from "styled-components";
import { OutlinedButton } from "./components/form/button/OutlinedButton";
import { useGameContext } from "./state/context/GameContext";
import { designVariables } from "./styles/globalVariables";
const Game = () => {
  const { onBet, onCashout, state, revealedTiles = [] } = useGameContext();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"bet" | "cashout" | "none">("none");

  useEffect(() => {
    if (loading) {
      if (action === "bet" && onBet) {
        onBet();
        setAction("none");
        setLoading(false);
        return;
      }
      if (action === "cashout" && onCashout) {
        onCashout();
        setLoading(false);
        setAction("none");
        return;
      }
      setLoading(false);
    }
  }, [action, onBet, onCashout, loading]);

  console.log("Inside game", state);
  const handleBet = (e: MouseEvent) => {
    setAction("bet");
    setLoading(true);
  };
  const handleCashout = (e: MouseEvent) => {
    setAction("cashout");
    setLoading(true);
  };
  const disableCashout =
    loading ||
    state === "cashout" ||
    revealedTiles.length < 5 ||
    state === "busted";

  console.log("disable cashout", disableCashout, loading, action, state);
  return (
    <StyledDiv>
      <div className="btn-container">
        <div className="btn-bet">
          <OutlinedButton
            color={designVariables.palette.green100}
            hoverColor={designVariables.palette.green700}
            title="bet"
            disabled={loading || state === "progress"}
            disabledColor={designVariables.palette.dark300}
            onClick={handleBet}
          />
        </div>
        <div className="btn-cashout">
          <OutlinedButton
            color={designVariables.palette.green100}
            hoverColor={designVariables.palette.green700}
            title="cash out"
            disabled={disableCashout}
            disabledColor={designVariables.palette.dark300}
            onClick={handleCashout}
          />
        </div>
      </div>
      <Board boardWidth={25} gridMatrix={5} />
    </StyledDiv>
  );
};

export default Game;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  .btn-container {
    display: flex;
    justify-content: center;
    .btn-bet {
      width: 10rem;
      margin-right: 10%;
    }
    .btn-cashout {
      width: 10rem;
    }
  }
`;
