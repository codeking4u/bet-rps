import Bet from "../bet/bet.component";

import { Bets } from "../../types/bets.enum";
import styles from "./bet-position.module.scss";

const BetPosition = () => {
  return (
    <div className={styles.betPosition}>
      <div>PICK YOUR POSITIONS</div>
      <div className={styles.betContainer}>
        {Object.values(Bets).map((bet) => (
          <Bet key={bet} bet={bet} />
        ))}
      </div>
    </div>
  );
};

export default BetPosition;
