"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AuthContext = React.createContext();

var App = function App() {
  var _React$useState = React.useState({
    isLoggedIn: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      authState = _React$useState2[0],
      setAuthState = _React$useState2[1];

  setAuthStateChanged(function (user) {
    var authState = user ? {
      isLoggedIn: true,
      uid: user.uid,
      displayName: user.displayName
    } : {
      isLoggedIn: false
    };
    setAuthState(authState);
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "app"
  }, /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: authState
  }, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement(Jumbotron, null), /*#__PURE__*/React.createElement(VotePanel, null), /*#__PURE__*/React.createElement(Footer, null)));
};
"use strict";

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
"use strict";

var Footer = function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "text-center mt-2"
  }, "R\xE9alis\xE9 par ", /*#__PURE__*/React.createElement("a", {
    href: "www.github.com/PierreLemmel"
  }, "Pierre Lemmel"), " pour ", /*#__PURE__*/React.createElement("a", {
    href: "https://latelier.co"
  }, "L'Atelier"));
};
"use strict";

var Jumbotron = function Jumbotron() {
  return /*#__PURE__*/React.createElement("section", {
    className: "jumbotron text-center"
  }, /*#__PURE__*/React.createElement(JumbotronBanneer, null), /*#__PURE__*/React.createElement(MainTitle, null), /*#__PURE__*/React.createElement(TagLine, null));
};

var JumbotronBanneer = function JumbotronBanneer() {
  return /*#__PURE__*/React.createElement("img", {
    src: "img/maki.png",
    alt: "cutest cat ever",
    id: "maki-banneer"
  });
};

var MainTitle = function MainTitle() {
  return /*#__PURE__*/React.createElement("h1", {
    className: "main-title"
  }, "Cat Mash");
};

var TagLine = function TagLine() {
  return /*#__PURE__*/React.createElement("p", {
    className: "tagline"
  }, "Qui sera le chat le plus mignon ?");
};
"use strict";

var NavBar = function NavBar() {
  return /*#__PURE__*/React.createElement("header", {
    className: "navbar px-2"
  }, /*#__PURE__*/React.createElement(NavBarLogo, {
    imgWidth: 36,
    imgHeight: 36
  }), /*#__PURE__*/React.createElement(AuthContext.Consumer, null, function (ctx) {
    return /*#__PURE__*/React.createElement(SignContentUserDetail, {
      text: ctx.isLoggedIn ? "Connect\xE9 en tant que ".concat(ctx.displayName) : "Non connecté"
    });
  }), /*#__PURE__*/React.createElement(AuthContext.Consumer, null, function (ctx) {
    return ctx.isLoggedIn ? /*#__PURE__*/React.createElement(SignOutButton, null) : /*#__PURE__*/React.createElement(SignInButton, null);
  }));
};

var NavBarLogo = function NavBarLogo(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "vertical-center"
  }, /*#__PURE__*/React.createElement("a", {
    className: "navbar-brand",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/maki.png",
    alt: "maki-logo",
    width: props.imgWidth,
    height: props.imgHeight
  })));
};

var SignContentUserDetail = function SignContentUserDetail(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ms-auto me-2"
  }, props.text);
};

var SignButton = function SignButton(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: props.clickHandler
  }, props.label)));
};

var SignInButton = function SignInButton() {
  return /*#__PURE__*/React.createElement(SignButton, {
    clickHandler: userSignIn,
    label: "Se Connecter"
  });
};

var SignOutButton = function SignOutButton() {
  return /*#__PURE__*/React.createElement(SignButton, {
    clickHandler: userSignOut,
    label: "Se D\xE9connecter"
  });
};
"use strict";

var foo = {
  bar: "Hello from a typescript file!"
};
console.log(foo.bar);
"use strict";

var VotePanel = function VotePanel() {
  return /*#__PURE__*/React.createElement("section", {
    className: "row align-items-center justify-content-center"
  }, /*#__PURE__*/React.createElement(CatColumn, {
    imgSrc: "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg",
    isSelected: true
  }), /*#__PURE__*/React.createElement(CatColumn, {
    imgSrc: "http://25.media.tumblr.com/tumblr_m4pwa9EXE41r6jd7fo1_500.jpg",
    isSelected: false
  }), /*#__PURE__*/React.createElement(VoteRow, null));
};

var CatColumn = function CatColumn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col cat-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cat-img-container p-3 ".concat(props.isSelected ? "cat-selected" : "cat-unselected")
  }, /*#__PURE__*/React.createElement("img", {
    src: props.imgSrc
  })));
};

var VoteRow = function VoteRow() {
  return /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-2"
  }, /*#__PURE__*/React.createElement(VoteButton, null));
};

var VoteButton = function VoteButton() {
  return /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary"
  }, "Voter !");
};
