import React from 'react';
import './Player.css';

const Player = ({ player }) => {
  return (
    <div className="card">
      <div className="avatar">
        <img src={player.photoURL} alt={player.displayName} />
      </div>
      <div className="info">
        <h2>
          {player.ranking} - {player.displayName}
        </h2>
        <span>{player.email}</span>
        <h3>Pontos: {player.score}</h3>
      </div>
    </div>
  );
};

export default Player;
