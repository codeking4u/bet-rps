import Bet from "../bet/bet.component";
const BetPosition = () => {
  return (
    <div className="betPosition">
      <div>PICK YOUR POSITIONS</div>
      <div className="betContainer">
        <Bet />
        <Bet />
        <Bet />
      </div>
    </div>
  );
};

export default BetPosition;
