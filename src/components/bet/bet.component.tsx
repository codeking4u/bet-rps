import { betInterface } from "../../types/interface";

import styles from "./bet.module.scss";

const Bet = ({ bet }: betInterface) => {
  return (
    <div className={`${styles.betOption} ${styles[bet]}`}>
      <div className={styles.betOption__value}>500</div>
      <div>{bet} </div>
    </div>
  );
};

export default Bet;
