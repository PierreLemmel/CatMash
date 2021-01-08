const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const getCurrentUser = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        return {
            isLoggedIn: true,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
        }
    }
    else {
        return {
            isLoggedIn: false
        }
    }
};

const userSignIn = (onSuccess) => auth.signInWithPopup(googleAuthProvider);
const userSignOut = (onSuccess) => auth.signOut();

let _onAuthStateChanged = user => {};
firebase.auth().onAuthStateChanged(user => _onAuthStateChanged(user));

const setAuthStateChanged = (callback) => _onAuthStateChanged = callback;