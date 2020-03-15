import React, { useState, useEffect, useContext } from 'react';
import { RankingContext } from '../contexts/RankingContext';

function Team({ players, num }) {
  const { state, dispatch } = useContext(RankingContext);
  const [score, setScore] = useState(0);
  const scoreRef = React.createRef();
  const p1 = React.createRef();
  const p2 = React.createRef();

  useEffect(() => {
    p1.current.addEventListener('change', e =>
      setTeam('player1', e.target.value)
    );
    p2.current.addEventListener('change', e =>
      setTeam('player2', e.target.value)
    );
  });

  const setTeam = (field, value) => {
    const team = {
      ...state[`team${num}`],
      [field]: value
    };
    if (field === 'score') {
      setScore(value);
    }
    if (state[`team${num}`][field] !== value) {
      dispatch({ type: `SET_TEAM${num}`, team });
    }
  };

  return (
    <div className="team">
      <h2>Time {num}</h2>
      <input
        ref={scoreRef}
        type="text"
        className="score"
        placeholder="placar"
        value={score}
        onChange={e => setTeam('score', e.target.value)}
        onFocus={e => scoreRef.current.select()}
        tabIndex={num}
      ></input>
      <high-select animated search ref={p1} tabIndex={num + 1}>
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
      <high-select animated search ref={p2} tabIndex={num + 3}>
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
    </div>
  );
}

export default Team;
