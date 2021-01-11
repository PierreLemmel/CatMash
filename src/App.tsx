import React from 'react';
import { Auth } from './Services/Auth';
import { AuthContext } from './Services/AuthContext';
import { NavBar } from './Widgets/NavBar';
import { Jumbotron } from './Widgets/Jumbotron';
import { VotePanel } from './Widgets/VotePanel';
import { Footer } from './Widgets/Footer';

export const App = () => {

    const [authState, setAuthState] = React.useState(Auth.AppUser.LoggedOut());

    Auth.onAuthStateChanged(user => setAuthState(user));

    return (<div id="app">
        <AuthContext.Provider value={authState}>
            <NavBar/>
            <Jumbotron/>
            <VotePanel/>
            <Footer/>
        </AuthContext.Provider>
    </div>)
};