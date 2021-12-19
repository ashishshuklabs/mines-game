import * as React from "react";
import Instructions from "./Intructions";
import Game from "./Game";
import "./styles.css";
import GlobalStyle from "./styles/GlobalSyle";
import { GameProvider } from "./state/context/GameContext";
export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Instructions />
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}
