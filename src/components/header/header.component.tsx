/* This component is responsible to show the stats such as balance, bet and win count */

import { useContext } from "react";
import { GameContext } from "../../context/game.context";

import styles from "./header.module.scss";

const Header = () => {
  const { state } = useContext(GameContext);
  return (
    <div className={styles.header}>
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
