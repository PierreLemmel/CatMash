const NavBar = () => <header className="navbar px-2">
    <NavBarLogo imgWidth={36} imgHeight={36} />

    <AuthContext.Consumer>
        {ctx => <SignContentUserDetail text={ctx.isLoggedIn ? `Connecté en tant que ${ctx.displayName}` : "Non connecté"} />}
    </AuthContext.Consumer>

    <AuthContext.Consumer>
        {ctx => ctx.isLoggedIn ? <SignOutButton/> : <SignInButton/>}
    </AuthContext.Consumer>
</header>;


const NavBarLogo = (props) => <div className="vertical-center">
    <a className="navbar-brand" href="#">
        <img src="img/maki.png" alt="maki-logo" width={props.imgWidth} height={props.imgHeight}/>
    </a>
</div>;

const SignContentUserDetail = (props) => <div className="ms-auto me-2">{props.text}</div>

const SignButton = (props) => <div>
    <div><button className="btn btn-primary" onClick={props.clickHandler}>{props.label}</button></div>
</div>;

const SignInButton = () => <SignButton clickHandler={userSignIn} label="Se Connecter" />;
const SignOutButton = () => <SignButton clickHandler={userSignOut} label="Se Déconnecter" />;