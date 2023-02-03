import React from "react";
import "./App.css";

import Header from "./components/header/header.component";
import GameInfo from "./components/game-info/game-info.component";
import BetPosition from "./components/bet-position/bet-position.component";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div className="App">
      <Header />
      <GameInfo />
      <BetPosition />
      <Footer />
    </div>
  );
}

export default App;
