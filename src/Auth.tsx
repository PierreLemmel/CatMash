import firebase from 'firebase';


export module Auth {

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
        let appUser : AppUser = user ? AppUser.LoggedIn(user.uid! ,user.displayName!) : AppUser.LoggedOut();
        _onAuthStateChanged(appUser);
    });

    export function onAuthStateChanged(callback : AuthStateChangedHandler) {
        _onAuthStateChanged = callback;
    }

    export class AppUser {
        isLoggedIn: boolean;
        uid: string | null;
        displayName: string | null;

        private constructor(isLoggedIn: boolean, uid: string|null, displayName: string|null) {
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