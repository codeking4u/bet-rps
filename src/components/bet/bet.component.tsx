import { useContext } from "react";
import { betInterface } from "../../types/interface";
import { GameContext } from "../../context/game.context";
import { GameMoves } from "../../types/game-move.enum";

import styles from "./bet.module.scss";

const Bet = ({ bet, onClick }: betInterface) => {
  const { state } = useContext(GameContext);
  return (
    <div
      className={`${styles.betOption} ${styles[bet.toLowerCase()]}`}
      onClick={() => onClick(bet)}
    >
      {state.playerSelection.includes(bet) && (
        <div className={styles.betOption__info}>
          <div className={styles.betOption__value}>
            {state.coinValue * state.bets[GameMoves[bet]]}
          </div>
        </div>
      )}

      <div>{bet} </div>
    </div>
  );
};

export default Bet;
