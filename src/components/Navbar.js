import React, { useContext, useEffect, useState } from "react";
import { RankingContext } from "../contexts/RankingContext";
import { Title } from "../styles";
import { updateRanking } from "../helpers";
import firebase, { db } from "../firebase.js";
import { getUserFromFirebase } from "../helpers";

const Navbar = () => {
  const { state, dispatch } = useContext(RankingContext);
  const [savingPlayer, isSavingPlayer] = useState(false);

  const setLogin = u => {
    const user = getUserFromFirebase(u);
    dispatch({ type: "SET_USER", user });
    fetchPlayers();
  };

  useEffect(() => {
    listenAuthChanges();
    checkFirstLogin();
  });

  const listenAuthChanges = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && !state.user) {
        setLogin(user);
        fetchPlayers();
      }
    });
  };

  const checkFirstLogin = async () => {
    if (
      state.playersFetched &&
      state.user &&
      state.user.email &&
      !savingPlayer &&
      !state.players.find(p => p.email === state.user.email)
    ) {
      isSavingPlayer(true);
      await db()
        .collection("probar-players")
        .add({ ...state.user, score: 0, ranking: 10000 })
      await updateRanking();  
      await fetchPlayers();
    }
  };

  const fetchPlayers = () => {
      db()
        .collection("probar-players")
        .get()
        .then(snaps => {
          let players = [];
          snaps.forEach(doc => {
            players.push(doc.data());
          });
          dispatch({ type: "SET_PLAYERS", players });
          if (savingPlayer) {
            isSavingPlayer(false);
          }
        })
        .catch(error => console.log("ERROR", error));
  };

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(user => {
        if (user) {
          setLogin(user);
        }
      })
      .catch(error => console.log(error));
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      {state.user ? (
        <div className="right">
          {state.user.displayName} <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Title>Pro Bari Ranking</Title>
      <p>Atualmente temos {state.players.length} jogadores no ranking.</p>
    </div>
  );
};

export default Navbar;
