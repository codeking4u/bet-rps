import { createContext, useState, useReducer } from "react";

import { GameMoves } from "../types/game-move.enum";

interface gameProviderContextProps {
  children: React.ReactNode;
}

interface GameContextProp {
  state: {
    playerSelection: [];
    computer: string;
    winner: string;
    selectedMoves: string[];
    coinValue: number;
    betAmount: number;
    balance: number;
    winCount: number;
    bets: { [key in GameMoves]: number };
  };
  dispatch: any;
}
export const GameContext = createContext<GameContextProp>({
  state: {
    playerSelection: [],
    computer: "",
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
  },
  dispatch: (_: any) => {},
});

const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case "play":
      const computer = Object.values(GameMoves)[Math.floor(Math.random() * 3)];

      let winner = "";
      if (state.playerSelection.includes(computer)) {
        winner = "tie";
      } else if (
        (state.playerSelection.includes(GameMoves.Rock) &&
          computer === GameMoves.Scissors) ||
        (state.playerSelection.includes(GameMoves.Paper) &&
          computer === GameMoves.Rock) ||
        (state.playerSelection.includes(GameMoves.Scissors) &&
          computer === GameMoves.Paper)
      ) {
        winner = "player";
        state.balance += state.betAmount;
        state.winCount += 1;
      } else {
        winner = "computer";
        state.balance -= state.betAmount;
      }
      return { ...state, computer, winner, bets: { ...state.bets } };
    case "bet":
      if (state.balance >= state.coinValue) {
        if (
          state.playerSelection.length === 2 &&
          !state.playerSelection.includes(action.bets)
        ) {
          console.log(JSON.stringify(state));
          alert("Max two selections are possible");
          return state;
        }

        state.bets[action.bets] += 1;
        return {
          ...state,
          playerSelection: state.playerSelection.includes(action.bets)
            ? [...state.playerSelection]
            : [...state.playerSelection, action.bets],
          balance: state.balance - state.coinValue,
          betAmount: state.betAmount + state.coinValue,
          bets: { ...state.bets },
        };
      } else {
        return state;
      }
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
    bets: { rock: 0, paper: 0, scissors: 0 },
  });
  const [playerMove, setPlayerMove] = useState("");

  const handleBet = () => {
    if (playerMove) {
      dispatch({ type: "play", move: playerMove });
    } else {
      dispatch({ type: "bet", bets: playerMove });
    }
  };
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
