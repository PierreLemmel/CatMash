import {Auth} from "./Auth";
import {AuthContext} from "./AuthContext";
import React from 'react';

export const NavBar = () => <header className="navbar px-2">
    <NavBarLogo imgWidth={36} imgHeight={36} />

    <AuthContext.Consumer>
        {ctx => <SignContentUserDetail text={ctx.isLoggedIn ? `Connecté en tant que ${ctx.displayName}` : "Non connecté"} />}
    </AuthContext.Consumer>

    <AuthContext.Consumer>
        {ctx => ctx.isLoggedIn ? <SignOutButton/> : <SignInButton/>}
    </AuthContext.Consumer>
</header>;

type NavBarLogoProps = {
    imgWidth: number,
    imgHeight: number
};
const NavBarLogo = (props: NavBarLogoProps) => <div className="vertical-center">
    <a className="navbar-brand" href="#">
        <img src="img/maki.png" alt="maki-logo" width={props.imgWidth} height={props.imgHeight}/>
    </a>
</div>;

type SignContentUserDetailProps = {
    text: string,
};
const SignContentUserDetail = (props: SignContentUserDetailProps) => <div className="ms-auto me-2">{props.text}</div>

type SignButtonProps = {
    label: string,
    clickHandler: Function
};
const SignButton = (props: SignButtonProps) => <div>
    <div><button className="btn btn-primary" onClick={() => props.clickHandler()}>{props.label}</button></div>
</div>;

const SignInButton = () => <SignButton clickHandler={Auth.userSignIn} label="Se Connecter" />;
const SignOutButton = () => <SignButton clickHandler={Auth.userSignOut} label="Se Déconnecter" />;