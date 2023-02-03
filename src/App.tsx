import React from "react";
import "./App.css";

import Header from "./components/header/header.component";
import GameInfo from "./components/game-info/game-info.component";
import BetPosition from "./components/bet-position/bet-position.component";

function App() {
  return (
    <>
      <Header />
      <GameInfo />
      <BetPosition />
    </>
  );
}

export default App;
