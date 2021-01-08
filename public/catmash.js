var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var AuthContext = React.createContext();

var App = function App() {
    var _React$useState = React.useState({ isLoggedIn: false }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        authState = _React$useState2[0],
        setAuthState = _React$useState2[1];

    setAuthStateChanged(function (user) {
        var authState = user ? { isLoggedIn: true, uid: user.uid, displayName: user.displayName } : { isLoggedIn: false };
        setAuthState(authState);
    });

    return React.createElement(
        "div",
        { id: "app" },
        React.createElement(
            AuthContext.Provider,
            { value: authState },
            React.createElement(NavBar, null),
            React.createElement(Jumbotron, null),
            React.createElement(Footer, null)
        )
    );
};
var auth = firebase.auth();
var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

var getCurrentUser = function getCurrentUser() {
    var currentUser = auth.currentUser;

    if (currentUser) {
        return {
            isLoggedIn: true,
            uid: currentUser.uid,
            displayName: currentUser.displayName
        };
    } else {
        return {
            isLoggedIn: false
        };
    }
};

var userSignIn = function userSignIn(onSuccess) {
    return auth.signInWithPopup(googleAuthProvider);
};
var userSignOut = function userSignOut(onSuccess) {
    return auth.signOut();
};

var _onAuthStateChanged = function _onAuthStateChanged(user) {};
firebase.auth().onAuthStateChanged(function (user) {
    return _onAuthStateChanged(user);
});

var setAuthStateChanged = function setAuthStateChanged(callback) {
    return _onAuthStateChanged = callback;
};
var Footer = function Footer() {
    return React.createElement(
        "footer",
        { className: "text-center mt-2" },
        "R\xE9alis\xE9 par ",
        React.createElement(
            "a",
            { href: "www.github.com/PierreLemmel" },
            "Pierre Lemmel"
        ),
        " pour ",
        React.createElement(
            "a",
            { href: "https://latelier.co" },
            "L'Atelier"
        )
    );
};
var Jumbotron = function Jumbotron() {
    return React.createElement(
        "section",
        { className: "jumbotron text-center" },
        React.createElement(JumbotronBanneer, null),
        React.createElement(MainTitle, null),
        React.createElement(TagLine, null)
    );
};

var JumbotronBanneer = function JumbotronBanneer() {
    return React.createElement("img", { src: "img/maki.png", alt: "cutest cat ever", id: "maki-banneer" });
};
var MainTitle = function MainTitle() {
    return React.createElement(
        "h1",
        { "class": "main-title" },
        "Cat Mash"
    );
};
var TagLine = function TagLine() {
    return React.createElement(
        "p",
        { "class": "tagline" },
        "Qui sera le chat le plus mignon ?"
    );
};
var NavBar = function NavBar() {
    return React.createElement(
        "header",
        { className: "navbar px-2" },
        React.createElement(NavBarLogo, { imgWidth: 36, imgHeight: 36 }),
        React.createElement(
            AuthContext.Consumer,
            null,
            function (ctx) {
                return React.createElement(SignContentUserDetail, { text: ctx.isLoggedIn ? "Connect\xE9 en tant que " + ctx.displayName : "Non connecté" });
            }
        ),
        React.createElement(
            AuthContext.Consumer,
            null,
            function (ctx) {
                return ctx.isLoggedIn ? React.createElement(SignOutButton, null) : React.createElement(SignInButton, null);
            }
        )
    );
};

var NavBarLogo = function NavBarLogo(props) {
    return React.createElement(
        "div",
        { className: "vertical-center" },
        React.createElement(
            "a",
            { className: "navbar-brand", href: "#" },
            React.createElement("img", { src: "img/maki.png", alt: "maki-logo", width: props.imgWidth, height: props.imgHeight })
        )
    );
};

var SignContentUserDetail = function SignContentUserDetail(props) {
    return React.createElement(
        "div",
        { className: "ms-auto me-2" },
        props.text
    );
};

var SignButton = function SignButton(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { className: "btn btn-primary", onClick: props.clickHandler },
                props.label
            )
        )
    );
};

var SignInButton = function SignInButton() {
    return React.createElement(SignButton, { clickHandler: userSignIn, label: "Se Connecter" });
};
var SignOutButton = function SignOutButton() {
    return React.createElement(SignButton, { clickHandler: userSignOut, label: "Se D\xE9connecter" });
};
