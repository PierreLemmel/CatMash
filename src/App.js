const AuthContext = React.createContext();

const App = () => {

    const [authState, setAuthState] = React.useState({ isLoggedIn: false });

    setAuthStateChanged(user => {    
        let authState = user ? { isLoggedIn: true, uid: user.uid, displayName: user.displayName } : { isLoggedIn: false };
        setAuthState(authState);
    });

    return (<div id="app">
        <AuthContext.Provider value={authState}>
            <NavBar/>
            <Jumbotron/>
            <Footer/>
        </AuthContext.Provider>
    </div>)
};