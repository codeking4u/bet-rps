import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { GameContext } from "../../context/game.context";
import styles from "./game-info.module.scss";

const GameInfo = () => {
  const { state } = useContext(GameContext);
  const computerSelection = state.computerSelection;
  const playerSelection = state.playerSelection;
  const winner = state.winner;
  const winnerType = state.winnerType;
  const winAmount = state.winningAmount;
  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const gameStatus = state.gameStatus;

  useEffect(() => {
    if (gameStatus === "IN_PROGRESS") {
      setShowMessage1(true);
    } else if (gameStatus === "RESULT_TIME") {
      setShowMessage1(false);
      setShowMessage2(true);
    } else {
      setShowMessage1(false);
      setShowMessage2(false);
    }
  }, [gameStatus]);

  return (
    <div className={styles.gameInfo}>
      {showMessage1 && (
        <div className={styles.gameInfo__one}>
          <div className={styles.gameInfo__names}>
            <span className={styles.playerName}>{computerSelection}</span>
            <span className={styles.playerType}>{"( Computer )"}</span>
          </div>
          <span className={styles.vs}>vs</span>
          <div className={styles.gameInfo__names}>
            <span className={styles.playerName}>
              {playerSelection.join(" | ")}
            </span>
            <span className={styles.playerType}>{"( You )"}</span>
          </div>
        </div>
      )}
      {showMessage2 && winner && (
        <div className={`${styles.gameInfo__two} ${styles[winner]}`}>
          <span>{winner}</span> WON
        </div>
      )}
      {showMessage2 && winner && (
        <div className={styles.gameInfo__prize}>
          {winnerType === "Player" ? "YOU" : "COMPUTER"} WON{" "}
          {state.winnerType === "Player" && (
            <span className={styles.gameInfo__amount}>{winAmount}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default GameInfo;
