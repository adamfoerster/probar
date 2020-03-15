import React, { useContext } from 'react';
import { RankingContext } from '../contexts/RankingContext';

const Navbar = () => {
  const { state } = useContext(RankingContext);
  return (
    <div className="navbar">
      <h1>Pro Bari Ranking</h1>
      <p>Atualmente temos {state.players.length} jogadores no ranking.</p>
    </div>
  );
}
 
export default Navbar;