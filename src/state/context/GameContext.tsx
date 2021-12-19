import React, { useContext, createContext, useState } from "react";
import {
  CasinoGameMines,
  gameState,
  minesNext,
  minesBet,
  minesCashout,
} from "../../api";

type DispatchType = {
  onBet: () => void;
  onNext: (tileId: number) => void;
  onCashout: () => void;
};
type ContextType = CasinoGameMines & DispatchType;
const GameContext = createContext<ContextType>({
  ...gameState,
  onBet: () => {},
  onNext: () => {},
  onCashout: () => {},
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC = ({ children }) => {
  const [minesData, setMinesData] = useState<CasinoGameMines>(gameState);

  const onBet = async () => {
    const data = await minesBet();
    console.log("Inside context", data);
    setMinesData({ ...minesData, ...data });
  };
  const onNext = async (tileId: number) => {
    //dont do anything if tile already revealed
    if (minesData.revealedTiles.includes(tileId)) {
      return;
    }
    const data = await minesNext(tileId);
    setMinesData({ ...minesData, ...data });
  };
  const onCashout = async () => {
    const data = await minesCashout();
    setMinesData({ ...minesData, ...data });
  };
  return (
    <GameContext.Provider value={{ ...minesData, onBet, onNext, onCashout }}>
      {children}
    </GameContext.Provider>
  );
};
