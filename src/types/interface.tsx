import { GameMoves } from "./game-move.enum";
export interface BetPostions {
  id: number;
  title: string;
  classname: string;
}

export interface betInterface {
  bet: keyof typeof GameMoves;
  onClick: (bet: string) => void;
}

export interface gameProviderContextProps {
  children: React.ReactNode;
}

export interface GameContextProp {
  state: {
    playerSelection: string[];
    computerSelection: string;
    winner: string;
    winnerType: string;
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
