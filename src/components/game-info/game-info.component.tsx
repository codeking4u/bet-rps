import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { GameContext } from "../../context/game.context";
import styles from "./game-info.module.scss";

const GameInfo = () => {
  const { state } = useContext(GameContext);
  const looser = state.computerSelection;
  const winner = state.winner;
  const winAmount = "1000";
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
          <span className={styles.playerName}>{looser}</span>
          <span className={styles.vs}>vs</span>
          <span className={styles.playerName}>{winner}</span>
        </div>
      )}
      {showMessage2 && (
        <div className={styles.gameInfo__two}>
          <span>{winner}</span> WON
        </div>
      )}
      {showMessage2 && (
        <div className={styles.gameInfo__prize}>
          YOU WON <span className={styles.gameInfo__amount}>{winAmount}</span>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
