import { db } from '../firebase';

export const getUserFromFirebase = fbUser => ({
  email: fbUser.email,
  displayName: fbUser.displayName,
  photoURL: fbUser.photoURL
});

export const getPlayerFromDB = async email => {
  const snap = await db()
    .collection('probar-players')
    .where('email', '==', email)
    .get();
  return snap.docs[0].data();
};

export const saveGame = async (team1, team2) => {
  const game = {
    team1: {
      ...team1,
      player1: team1.player1 ? await getPlayerFromDB(team1.player1) : null,
      player2: team1.player2 ? await getPlayerFromDB(team1.player2) : null
    },
    team2: {
      ...team2,
      player1: team2.player1 ? await getPlayerFromDB(team2.player1) : null,
      player2: team2.player2 ? await getPlayerFromDB(team2.player2) : null
    }
  };
  await db()
    .collection('probar-games')
    .add(game);
  updatePlayerScores(game.team1, game.team2);
};

export const updatePlayerScores = async (team1, team2) => {
  let winner, loser;
  let winPoints = 2;
  let losePoints = 2;
  if (team1.score === team2.score) {
    return;
  }
  if (team1.score > team2.score) {
    winner = team1;
    loser = team2;
  } else {
    winner = team2;
    loser = team1;
  }
  if (!winner.player2 && loser.player2) {
    winPoints = 4;
    losePoints = 4;
  }
  if (winner.player2 && !loser.player2) {
    winPoints = 1;
    losePoints = 1;
  }
  await updatePlayerScore(winner.player1, winPoints);
  await updatePlayerScore(loser.player1, losePoints * -1);
  if (winner.player2) {
    await updatePlayerScore(winner.player2, winPoints);
  }
  if (loser.player2) {
    await updatePlayerScore(loser.player2, losePoints * -1);
  }
  await updateRanking();
};

const updatePlayerScore = async (player, points) => {
  const snap = await db()
    .collection('probar-players')
    .where('email', '==', player.email)
    .get();
  const id = snap.docs[0].id;
  await db()
    .collection('probar-players')
    .doc(id)
    .update({ score: player.score ? player.score + points : points });
};

export const updateRanking = async () => {
  const playersSnap = await db()
    .collection('probar-players')
    .get();
  let players = [];
  playersSnap.docs.forEach(snap =>
    players.push({ ...snap.data(), id: snap.id })
  );
  let pos = 1;
  await players
    .sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    })
    .map(p => ({
      ...p,
      ranking: pos++
    }))
    .forEach(async p => {
      await db()
        .collection('probar-players')
        .doc(p.id)
        .set(p);
    });
};

export const fetchPlayers = async () => {
  const snaps = await db()
    .collection('probar-players')
    .get();
  let players = [];
  snaps.forEach(doc => {
    players.push(doc.data());
  });
  return players;
};
