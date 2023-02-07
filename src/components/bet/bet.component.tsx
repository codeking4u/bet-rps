import { betInterface } from "../../types/interface";

import styles from "./bet.module.scss";

const Bet = ({ bet, onClick }: betInterface) => {
  return (
    <div
      className={`${styles.betOption} ${styles[bet]}`}
      onClick={() => onClick(bet)}
    >
      <div className={styles.betOption__value}>500</div>
      <div>{bet} </div>
    </div>
  );
};

export default Bet;
