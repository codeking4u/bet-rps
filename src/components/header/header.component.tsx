import { useContext } from "react";
import { GameContext } from "../../context/game.context";

const Header = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="header">
      <div>
        Balance: <span>{state.balance}</span>
      </div>
      <div>
        BET: <span>{state.betAmount}</span>
      </div>
      <div>
        WIN: <span>{state.winCount}</span>
      </div>
    </div>
  );
};

export default Header;
