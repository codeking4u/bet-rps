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
