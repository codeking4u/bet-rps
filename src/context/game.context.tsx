import { createContext, useReducer } from "react";

import { GameMoves } from "../types/game-move.enum";
import { gameProviderContextProps, GameContextProp } from "../types/interface";
import { gameReducer } from "../utils/gameReducer";
import { initialDefaultState } from "../utils/gamelogic";

export const GameContext = createContext<GameContextProp>({
  state: initialDefaultState,
  dispatch: (_: keyof typeof GameMoves) => {},
});

export const GameProvider = ({ children }: gameProviderContextProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialDefaultState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
