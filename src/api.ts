// following API - this is how to not write an API
import _ from "lodash";

export type State = "idle" | "progress" | "cashout" | "busted";

export type CasinoGameMines = {
  minesCount: number;
  mines: number[];
  revealedTiles: number[];
  gems:number[];
  state: State;
};

export const wait = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, Math.random() * 500 + 200)
  );

export const gameState: CasinoGameMines = {
  minesCount: 5,
  mines: [],
  gems:[],
  revealedTiles: [],
  state: "idle",
};

const minesFields = _.range(0, 25);

export const minesBet = async () => {
  await wait();

  const newRoundTiles = _.shuffle(minesFields);
  gameState.mines = newRoundTiles.slice(0, 5);
  gameState.revealedTiles = [];
  return getGameState("progress");
};

export const minesNext = async (tileToReveal: number) => {
  await wait();

  gameState.revealedTiles.push(tileToReveal);

  if (gameState.mines.includes(tileToReveal)) {
    return getGameState("busted");
  }

  return getGameState("progress");
};

const getGameState = (state: State) => {
  gameState.state = state;

  // if (state === "busted") {
  //   return { ...gameState, mines: [] };
  // }
  // if (state === "cashout") {
  //   return { ...gameState, revealedTiles: [] };
  // }

  return gameState;
};

export const minesCashout = async () => {
  await wait();

  return getGameState("cashout");
};
