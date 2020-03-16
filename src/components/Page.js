import React, { useContext } from "react";
import { RankingContext } from "../contexts/RankingContext";
import Ranking from "./Ranking";
import GameReport from "./GameReport";
import Navbar from "./Navbar";

function Page() {
  const { state } = useContext(RankingContext);

  return !!state.user ? (
    <div className="page">
      <Navbar />
      <GameReport />
      <Ranking />
    </div>
  ) : (
    <div>
      <Navbar />
      <Ranking />
    </div>
  );
}

export default Page;
