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

      let winnerData = winnerLogic(computer, state.playerSelection);
      let winner = winnerData[0];
      let winnerType = winnerData[1];

      if (winnerType === "Player") {
        state.winCount += 1;
        if (state.playerSelection.length === 1) {
          state.balance += state.betAmount * WinMultiple.OneSelection;
        } else {
          state.balance += state.betAmount * WinMultiple.TwoSelection;
        }
      }

      return {
        ...state,
        computerSelection: computer,
        winner,
        winnerType,
        bets: { ...state.bets },
        gameStatus: "IN_PROGRESS",
      };
    case "result":
      return {
        ...state,
        gameStatus: "RESULT_TIME",
      };
    case "reset":
      return {
        ...state,
        playerSelection: [],
        computerSelection: "",
        winner: "",
        winnerType: "",
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
