import React, { useContext } from 'react';
import Player from './Player';
import './Ranking.css';
import { RankingContext } from '../contexts/RankingContext';

const Ranking = () => {
  const { state } = useContext(RankingContext);
  return state.players.length ? (
    <div className="ranking">
      <ul>
        {state.players
          .sort((a, b) => {
            if (a.score > b.score) return -1;
            if (a.score < b.score) return 1;
            return 0;
          })
          .map(player => {
            return <Player player={player} key={player.email} />;
          })}
      </ul>
    </div>
  ) : (
    <div className="empty">Nenhum jogador no ranking ainda :).</div>
  );
};

export default Ranking;
