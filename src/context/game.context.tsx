import { createContext, useState, useReducer } from "react";

import { GameMoves } from "../types/game-move.enum";

interface gameProviderContextProps {
  children: React.ReactNode;
}

interface GameContextProp {
  state: {
    playerSelection: string[];
    computerSelection: string;
    winner: string;
    selectedMoves: string[];
    coinValue: number;
    betAmount: number;
    balance: number;
    winCount: number;
    bets: { [key in GameMoves]: number };
    gameStatus: "START_PLAY" | "IN_PROGRESS" | "RESULT_TIME";
  };
  dispatch: any;
}
export const GameContext = createContext<GameContextProp>({
  state: {
    playerSelection: [],
    computerSelection: "",
    winner: "",
    selectedMoves: [],
    coinValue: 500,
    betAmount: 0,
    balance: 5000,
    winCount: 0,
    bets: {
      [GameMoves.Rock]: 0,
      [GameMoves.Paper]: 0,
      [GameMoves.Scissors]: 0,
    },
    gameStatus: "START_PLAY",
  },
  dispatch: (_: keyof typeof GameMoves) => {},
});

const winnerLogic = (computer: string, player: string[]) => {
  let winner = "";
  if (
    (computer === GameMoves.Scissors && player.includes(GameMoves.Rock)) ||
    (computer === GameMoves.Rock && player.includes(GameMoves.Paper)) ||
    (computer === GameMoves.Paper && player.includes(GameMoves.Scissors))
  ) {
    winner = "player";
  } else {
    winner = "computer";
  }
  return winner;
};

const gameReducer = (
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
          alert("Max two selections are possible");
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

      let winner = "";
      winner = winnerLogic(computer, state.playerSelection);

      if (winner === "player") {
        state.balance += state.betAmount;
        state.winCount += 1;
      } else {
        state.balance -= state.betAmount;
      }

      return {
        ...state,
        computerSelection: computer,
        winner,
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
        playerSelection: [],
        computerSelection: "",
        winner: "",
        moves: ["rock", "paper", "scissors"],
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
    default:
      return state;
  }
};

export const GameProvider = ({ children }: gameProviderContextProps) => {
  const [state, dispatch] = useReducer(gameReducer, {
    playerSelection: [],
    computerSelection: "",
    winner: "",
    moves: ["rock", "paper", "scissors"],
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
  });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
