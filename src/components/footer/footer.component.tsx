import { useContext } from "react";
import { GameContext } from "../../context/game.context";

import styles from "./footer.module.scss";

const Footer = () => {
  const { state, dispatch } = useContext(GameContext);
  const handlePlay = () => {
    dispatch({ type: "play" });
    setTimeout(function () {
      dispatch({ type: "result" });
    }, 3000);
  };
  const handleClear = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className={styles.footer}>
      {state.gameStatus == "RESULT_TIME" ? (
        <button onClick={handleClear}>CLEAR</button>
      ) : (
        <button
          disabled={state.gameStatus == "IN_PROGRESS"}
          onClick={handlePlay}
        >
          PLAY
        </button>
      )}
    </div>
  );
};

export default Footer;
