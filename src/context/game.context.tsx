import { createContext, useState, useReducer } from "react";

interface gameProviderContextProps {
  children: React.ReactNode;
}

interface GameContextProp {
  state: {
    player: string;
    computer: string;
    winner: string;
    moves: string[];
    betAmount: number;
    balance: number;
    winCount: number;
    bets: { [key: string]: number };
  };
  dispatch: any;
}
export const GameContext = createContext<GameContextProp>({
  state: {
    player: "",
    computer: "",
    winner: "",
    moves: ["rock", "paper", "scissors"],
    betAmount: 500,
    balance: 5000,
    winCount: 0,
    bets: { rock: 0, paper: 0, scissors: 0 },
  },
  dispatch: (_: any) => {},
});

const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case "play":
      const computer =
        state.moves[Math.floor(Math.random() * state.moves.length)];
      let winner = "";
      if (state.player === computer) {
        winner = "tie";
      } else if (
        (state.player === "rock" && computer === "scissors") ||
        (state.player === "paper" && computer === "rock") ||
        (state.player === "scissors" && computer === "paper")
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
      if (state.balance >= state.betAmount * 2) {
        state.bets[action.move] += 1;
        return {
          ...state,
          balance: state.balance - state.betAmount * 2,
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
    player: "",
    computer: "",
    winner: "",
    moves: ["rock", "paper", "scissors"],
    betAmount: 500,
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
