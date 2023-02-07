import { useContext } from "react";
import Bet from "../bet/bet.component";

import { GameMoves } from "../../types/game-move.enum";
import { GameContext } from "../../context/game.context";

import styles from "./bet-position.module.scss";

const BetPosition = () => {
  const { state, dispatch } = useContext(GameContext);
  const keys = Object.keys(GameMoves) as (keyof typeof GameMoves)[];

  const betClickHandler = (bet: keyof typeof GameMoves) => {
    console.log("clicked");
    dispatch({ type: "bet", bets: bet });
  };

  return (
    <div className={styles.betPosition}>
      <div>PICK YOUR POSITIONS</div>
      <div className={styles.betContainer}>
        {keys.map((move) => (
          <Bet key={move} bet={move} onClick={() => betClickHandler(move)} />
        ))}
      </div>
    </div>
  );
};

export default BetPosition;
