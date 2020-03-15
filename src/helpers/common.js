export const getUserFromFirebase = fbUser => ({
  email: fbUser.email,
  displayName: fbUser.displayName,
  photoURL: fbUser.photoURL
});
