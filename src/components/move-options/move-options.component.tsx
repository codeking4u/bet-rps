/* This component is a container to Game Moves  */

import { useContext } from "react";
import Move from "../move/move.component";

import { GameMoves } from "../../types/game-move.enum";
import { GameContext } from "../../context/game.context";

import styles from "./move-options.module.scss";

const MoveOptions = () => {
  const { state, dispatch } = useContext(GameContext);
  const keys = Object.keys(GameMoves) as (keyof typeof GameMoves)[];

  const betClickHandler = (bet: keyof typeof GameMoves) => {
    if (state.balance < state.coinValue) {
      alert("You do not have enough balance to play!");
      return;
    }
    dispatch({ type: "bet", bets: bet });
  };

  return (
    <div className={styles.betPosition}>
      <div>PICK YOUR POSITIONS</div>
      <div
        className={`${styles.betContainer} ${
          state.gameStatus !== "START_PLAY" ? styles.disableMove : ""
        }`}
      >
        {keys.map((move) => (
          <Move key={move} bet={move} onClick={() => betClickHandler(move)} />
        ))}
      </div>
    </div>
  );
};

export default MoveOptions;
