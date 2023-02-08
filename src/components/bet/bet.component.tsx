import { useContext } from "react";
import { betInterface } from "../../types/interface";
import { GameContext } from "../../context/game.context";
import { GameMoves } from "../../types/game-move.enum";

import styles from "./bet.module.scss";

const Bet = ({ bet, onClick }: betInterface) => {
  const { state } = useContext(GameContext);
  const gameMove = GameMoves[bet];
  let disableMoveClass = false;
  if (state.gameStatus !== "START_PLAY") {
    disableMoveClass = true;
  }
  return (
    <div
      className={`${styles.betOption} ${styles[bet.toLowerCase()]} ${
        gameMove === state.winner && state.winnerType === "Player"
          ? styles.winner
          : ""
      } ${disableMoveClass ? styles.disableMove : ""}`}
      onClick={() => onClick(bet)}
    >
      {state.playerSelection.includes(gameMove) && (
        <div className={styles.betOption__info}>
          <div className={styles.betOption__value}>
            {state.coinValue * state.bets[gameMove]}
          </div>
        </div>
      )}

      <div>{bet} </div>
    </div>
  );
};

export default Bet;
