import { GameMoves } from "../types/game-move.enum";

export const winnerLogic = (computer: string, player: string[]) => {
  let winner = "";
  let winnerType = "Player";
  if (computer === GameMoves.Scissors && player.includes(GameMoves.Rock)) {
    winner = GameMoves.Rock;
  } else if (computer === GameMoves.Rock && player.includes(GameMoves.Paper)) {
    winner = GameMoves.Paper;
  } else if (
    computer === GameMoves.Paper &&
    player.includes(GameMoves.Scissors)
  ) {
    winner = GameMoves.Scissors;
  } else {
    winner = computer;
    winnerType = "Computer";
  }
  return [winner, winnerType];
};

export const initialDefaultState = {
  playerSelection: [],
  computerSelection: "",
  winner: "",
  winnerType: "",
  betAmount: 0,
  coinValue: 500,
  balance: 5000,
  winCount: 0,
  bets: {
    [GameMoves.Rock]: 0,
    [GameMoves.Paper]: 0,
    [GameMoves.Scissors]: 0,
  },
  gameStatus: "START_PLAY",
};
