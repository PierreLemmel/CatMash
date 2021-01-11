import React from 'react';
import { Auth } from './Services/Auth';
import { AuthContext } from './Services/AuthContext';
import { NavBar } from './Widgets/NavBar';
import { Jumbotron } from './Widgets/Jumbotron';
import { VotePanel } from './Widgets/VotePanel';
import { Footer } from './Widgets/Footer';
import { VoteContext, VoteContextData } from './Services/VoteContext';

export const App = () => {

    const [authState, setAuthState] = React.useState(Auth.AppUser.LoggedOut());
    const [voteState, setVoteState] = React.useState(VoteContextData.unitialized);

    Auth.onAuthStateChanged(user => setAuthState(user));

    return (<div id="app">
        <AuthContext.Provider value={authState}>
            <VoteContext.Provider value={voteState}>
                <NavBar/>
                <Jumbotron/>
                <VotePanel/>
                <Footer/>
            </VoteContext.Provider>
        </AuthContext.Provider>
    </div>)
};