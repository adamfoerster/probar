import React, { createContext, useReducer, useEffect } from 'react';
import { rankingReducer, initialState } from '../reducers/rankingReducer';

export const RankingContext = createContext();

const RankingContextProvider = props => {
  const [state, dispatch] = useReducer(rankingReducer, initialState, () => initialState);
  useEffect(() => {}, [state]);
  return (
    <RankingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RankingContext.Provider>
  );
};

export default RankingContextProvider;
