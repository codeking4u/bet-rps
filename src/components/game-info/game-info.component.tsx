import React, { useState, useEffect } from "react";

import styles from "./game-info.module.scss";

const GameInfo = () => {
  const looser = "ROCK";
  const winner = "PAPER";
  const winAmount = "1000";
  const [showMessage1, setShowMessage1] = useState(true);
  const [showMessage2, setShowMessage2] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage1(false);
      setShowMessage2(true);
    }, 3000);
  }, []);

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
