import { GameMoves, WinMultiple } from "../types/game-move.enum";
import { winnerLogic } from "../utils/gamelogic";

export const gameReducer = (
  state: any,
  action: { type: string; bets: keyof typeof GameMoves }
) => {
  switch (action.type) {
    case "bet":
      const moveSelection = GameMoves[action.bets];
      if (state.balance >= state.coinValue) {
        if (
          state.playerSelection.length === 2 &&
          !state.playerSelection.includes(moveSelection)
        ) {
          alert("Max two selections are possible!");
          return state;
        }

        state.bets[moveSelection] += 1;

        return {
          ...state,
          playerSelection: state.playerSelection.includes(moveSelection)
            ? [...state.playerSelection]
            : [...state.playerSelection, moveSelection],
          balance: state.balance - state.coinValue,
          betAmount: state.betAmount + state.coinValue,
          bets: { ...state.bets },
          gameStatus: "START_PLAY",
        };
      } else {
        return state;
      }

    case "play":
      const computer = Object.values(GameMoves)[Math.floor(Math.random() * 3)];
      return {
        ...state,
        computerSelection: computer,
        gameStatus: "IN_PROGRESS",
      };
    case "result":
      let winnerData = winnerLogic(
        state.computerSelection,
        state.playerSelection
      );
      let winner = winnerData[0];
      let winnerType = winnerData[1];
      let winningAmount = 0;
      if (winnerType === "Player") {
        state.winCount += 1;
        if (state.playerSelection.length === 1) {
          winningAmount = state.betAmount * WinMultiple.OneSelection;
          state.balance += winningAmount;
        } else {
          winningAmount = state.betAmount * WinMultiple.TwoSelection;
          state.balance += winningAmount;
        }
      }
      return {
        ...state,
        winner,
        winnerType,
        winningAmount,
        bets: { ...state.bets },
        gameStatus: "RESULT_TIME",
      };
    case "reset":
      return {
        ...state,
        playerSelection: [],
        computerSelection: "",
        winner: "",
        winnerType: "",
        winningAmount: 0,
        betAmount: 0,
        bets: {
          [GameMoves.Rock]: 0,
          [GameMoves.Paper]: 0,
          [GameMoves.Scissors]: 0,
        },
        gameStatus: "START_PLAY",
      };
    default:
      return state;
  }
};
