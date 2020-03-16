import React, { useContext, useEffect, useState } from 'react';
import firebase, { db } from '../firebase.js';
import { getUserFromFirebase } from '../helpers';
import { RankingContext } from '../contexts/RankingContext';
import Ranking from './Ranking';
import GameReport from './GameReport';
import Navbar from './Navbar';

function Page() {
  const { state, dispatch } = useContext(RankingContext);
  const [savingPlayer, isSavingPlayer] = useState(false);

  useEffect(() => {
    listenAuthChanges();
    fetchPlayers();
    checkFirstLogin();
  });

  const listenAuthChanges = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && !state.user) {
        setLogin(user);
      }
    });
  };

  const fetchPlayers = () => {
    if (!state.playersFetched) {
      db()
        .collection('probar-players')
        .get()
        .then(snap => {
          let players = [];
          snap.forEach(doc => {
            players.push(doc.data());
          });
          dispatch({ type: 'SET_PLAYERS', players });
          if (savingPlayer) {
            isSavingPlayer(false);
          }
        })
        .catch(error => console.log('ERROR', error));
    }
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
      db()
        .collection('probar-players')
        .add({ ...state.user, score: 0, ranking: 10000 })
        .then(() => console.log('first login, adding you to the database'))
        .catch(error => console.log('ERROR', error));
    }
  };

  const setLogin = u => {
    const user = getUserFromFirebase(u);
    dispatch({ type: 'SET_USER', user });
    fetchPlayers();
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
    dispatch({type: 'LOGOUT'});
  };

  return !!state.user ? (
    <div className="page">
      <button onClick={logout}>Sair</button>
      <Navbar />
      <GameReport />
      <Ranking />
    </div>
  ) : (
    <div>
      <button onClick={login}>Login</button>
      <Navbar />
      <Ranking />
    </div>
  );
}

export default Page;
