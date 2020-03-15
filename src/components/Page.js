import React, { useContext, useEffect } from 'react';
import firebase, { db } from '../firebase.js';
import { getUserFromFirebase } from '../helpers/common';
import { RankingContext } from '../contexts/RankingContext';
import Ranking from './Ranking';
import GameReport from './GameReport';
import Navbar from './Navbar';

function Page() {
  const { state, dispatch } = useContext(RankingContext);

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
      })
      .catch(error => console.log('ERROR', error));
    }
  }

  const checkFirstLogin = () => {
    if (
      state.playersFetched &&
      state.user &&
      !state.players.find(p => p.email === state.user.email)
    ) {
      db()
        .collection('probar-players')
        .add(state.user)
        .then(() => console.log('first login, adding you to the database'))
        .catch(error => console.log('ERROR', error));
    }
  };

  const setLogin = u => {
    const user = getUserFromFirebase(u);
    dispatch({ type: 'SET_USER', user });
  };

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        if (user) {
          setLogin(user);
        }
      })
      .catch(error => console.log(error));
  };

  const logout = () => {
    firebase.auth().signOut();
  };
  return !!state.user ? (
    <div className="page">
      <button onClick={logout}>Sair</button>
      <Navbar />
      <GameReport />
      <Ranking />
    </div>
  ) : (
    <button onClick={login}>Login</button>
  );
}

export default Page;
