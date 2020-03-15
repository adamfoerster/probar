import React, { useContext, useState, useEffect } from 'react';
import Team from './Team';
import { RankingContext } from '../contexts/RankingContext';
import './GameReport.css';

const GameReport = () => {
  const { state, dispatch } = useContext(RankingContext);
  const [valid, checkValid] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    checkTeamsValid();
  });

  const checkTeamsValid = () => {
    const { team1, team2 } = state;
    if (!team1.player1 || !team2.player1) {
      return checkValid(() => false);
    }
    checkValid(() => true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="game-report">
        <Team num="1" players={state.players}></Team>
        <Team num="2" players={state.players}></Team>
      </div>
      <input type="submit" value="Inserir Partida" disabled={!valid} />
    </form>
  );
};

export default GameReport;
