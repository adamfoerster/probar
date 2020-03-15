import React, { useContext, useState, useEffect } from 'react';
import Team from './Team';
import { RankingContext } from '../contexts/RankingContext';
import './GameReport.css';

const GameReport = () => {
  const { valid, checkValid } = useState(false);
  const { state, dispatch } = useContext(RankingContext);
  const [ team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(team1, team2);
  }, [state]);

  // const setTeam1 = (score, player1, player2) => {
  //   console.log(score, player1, player2);
  // };
  // const setTeam2 = (score, player1, player2) => {
  //   console.log(score, player1, player2);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="game-report">
        <Team num="1" players={state.players} setTeam={setTeam1}></Team>
        <Team num="2" players={state.players} setTeam={setTeam2}></Team>
      </div>
      <input type="submit" value="Inserir Partida" disabled={!valid} />
    </form>
  );
};

export default GameReport;
