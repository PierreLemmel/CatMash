import firebase from 'firebase';


module Auth {

    const firebaseAuth = firebase.auth();
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    export function userSignIn() : void {
        firebaseAuth.signInWithPopup(googleAuthProvider);
    }

    export function userSignOut() : void {
        firebaseAuth.signOut();
    }

    let _onAuthStateChanged : AuthStateChangedHandler = user => {};
    firebase.auth().onAuthStateChanged(user => {
        let appUser : AppUser = user ? {
                isLoggedIn: true,
                uid: user.uid,
                displayName: user.displayName
            } : {
                isLoggedIn: false,
                uid: null,
                displayName: null
            };

        _onAuthStateChanged(appUser);
    });

    export function setAuthStateChanged(callback : AuthStateChangedHandler) {
        _onAuthStateChanged = callback;
    }

    export class AppUser {
        isLoggedIn: boolean;
        uid: string | null;
        displayName: string | null;

        private constructor(isLoggedIn: boolean, uid: string, displayName: string) {
            this.isLoggedIn = isLoggedIn;
            this.uid = uid;
            this.displayName = displayName;
        }

        static LoggedIn(uid: string, displayName: string) : AppUser {
            return new AppUser(true, uid, displayName);
        }

        static LoggedOut() : AppUser {
            return new AppUser(false, null, null);
        }
    }
    
    export interface AuthStateChangedHandler {
        (user: AppUser) : void;
    }
}