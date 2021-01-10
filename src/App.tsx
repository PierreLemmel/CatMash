import React from 'react';
import { Auth } from './Auth';
import { AuthContext } from './AuthContext';
import { NavBar } from './NavBar';
import { Jumbotron } from './Jumbotron';
import { VotePanel } from './VotePanel';
import { Footer } from './Footer';

export const App = () => {

    const [authState, setAuthState] = React.useState(Auth.AppUser.LoggedOut());

    Auth.onAuthStateChanged(user => {    
        let authState = user ? Auth.AppUser.LoggedIn(user.uid!, user.displayName!) : Auth.AppUser.LoggedOut();
        setAuthState(authState);
    });

    return (<div id="app">
        <AuthContext.Provider value={authState}>
            <NavBar/>
            <Jumbotron/>
            <VotePanel/>
            <Footer/>
        </AuthContext.Provider>
    </div>)
};