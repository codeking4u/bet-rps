import React from "react";
import "./App.scss";

import Header from "./components/header/header.component";
import GameInfo from "./components/game-info/game-info.component";
import MoveOptions from "./components/move-options/move-options.component";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div className="App">
      <Header />
      <GameInfo />
      <MoveOptions />
      <Footer />
    </div>
  );
}

export default App;
