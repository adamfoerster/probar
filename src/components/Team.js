import React, { useState, useEffect } from 'react';

function Team({ players, num, setTeam }) {
  const [score, setScore] = useState(0);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const scoreRef = React.createRef();
  const p1 = React.createRef();
  const p2 = React.createRef();

  useEffect(() => {
    p1.current.addEventListener('change', e => setPlayer1(e.target.value));
    p2.current.addEventListener('change', e => setPlayer2(e.target.value));
    // setTeam({score, player1, player2});
  });

  return (
    <div className="team">
      <h2>Time {num}</h2>
      <input
        ref={scoreRef}
        type="text"
        className="score"
        placeholder="placar"
        value={score}
        onChange={e => setScore(e.target.value)}
        onFocus={e => scoreRef.current.select()}
        tabIndex={num}
      ></input>
      <high-select animated search value={player1} ref={p1} tabIndex={num + 1}>
        <high-option key="0" selected>
          Escolha um jogador
        </high-option>
        {players.map(player => {
          return (
            <high-option key={player.email} value={player.email}>
              {player.displayName}
            </high-option>
          );
        })}
      </high-select>
      <high-select animated search value={player2} ref={p2} tabIndex={num + 3}>
        <high-option key="0" selected>
          Escolha um jogador
        </high-option>
        {players.map(player => {
          return (
            <high-option key={player.email}>{player.displayName}</high-option>
          );
        })}
      </high-select>
    </div>
  );
}

export default Team;
