import React, { useContext } from "react";
import Player from "./Player";
import './Ranking.css';
import { RankingContext } from "../contexts/RankingContext";

const Ranking = () => {
  const { state } = useContext(RankingContext);
  return state.players.length ? (
    <div className="ranking">
      <ul>
        {state.players.map(player => {
          return <Player player={player} key={player.email} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">Nenhum jogador no ranking ainda :).</div>
  );
};

export default Ranking;
