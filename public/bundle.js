/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: external "React"
const external_React_namespaceObject = React;
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_namespaceObject);
;// CONCATENATED MODULE: external "ReactDOM"
const external_ReactDOM_namespaceObject = ReactDOM;
var external_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_ReactDOM_namespaceObject);
;// CONCATENATED MODULE: external "firebase"
const external_firebase_namespaceObject = firebase;
var external_firebase_default = /*#__PURE__*/__webpack_require__.n(external_firebase_namespaceObject);
;// CONCATENATED MODULE: ./src/Services/Auth.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Auth;

(function (_Auth) {
  var firebaseAuth = external_firebase_default().auth();
  var googleAuthProvider = new (external_firebase_default()).auth.GoogleAuthProvider();

  function userSignIn() {
    firebaseAuth.signInWithPopup(googleAuthProvider);
  }

  _Auth.userSignIn = userSignIn;

  function userSignOut() {
    firebaseAuth.signOut();
  }

  _Auth.userSignOut = userSignOut;

  var _onAuthStateChanged = function _onAuthStateChanged(user) {};

  external_firebase_default().auth().onAuthStateChanged(function (user) {
    var appUser = user ? AppUser.LoggedIn(user.uid, user.displayName) : AppUser.LoggedOut();

    _onAuthStateChanged(appUser);
  });

  function onAuthStateChanged(callback) {
    _onAuthStateChanged = callback;
  }

  _Auth.onAuthStateChanged = onAuthStateChanged;

  var AppUser = /*#__PURE__*/function () {
    function AppUser(isLoggedIn, uid, displayName) {
      _classCallCheck(this, AppUser);

      this.isLoggedIn = isLoggedIn;
      this.uid = uid;
      this.displayName = displayName;
    }

    _createClass(AppUser, null, [{
      key: "LoggedIn",
      value: function LoggedIn(uid, displayName) {
        return new AppUser(true, uid, displayName);
      }
    }, {
      key: "LoggedOut",
      value: function LoggedOut() {
        return new AppUser(false, null, null);
      }
    }]);

    return AppUser;
  }();

  _Auth.AppUser = AppUser;
})(Auth || (Auth = {}));
;// CONCATENATED MODULE: ./src/Services/AuthContext.ts


var AuthContext = /*#__PURE__*/external_React_default().createContext(Auth.AppUser.LoggedOut());
;// CONCATENATED MODULE: ./src/Widgets/NavBar.tsx



var NavBar = function NavBar() {
  return /*#__PURE__*/external_React_default().createElement("header", {
    className: "navbar px-2"
  }, /*#__PURE__*/external_React_default().createElement(NavBarLogo, {
    imgWidth: 36,
    imgHeight: 36
  }), /*#__PURE__*/external_React_default().createElement(AuthContext.Consumer, null, function (ctx) {
    return /*#__PURE__*/external_React_default().createElement(SignContentUserDetail, {
      text: ctx.isLoggedIn ? "Connect\xE9 en tant que ".concat(ctx.displayName) : "Non connecté"
    });
  }), /*#__PURE__*/external_React_default().createElement(AuthContext.Consumer, null, function (ctx) {
    return ctx.isLoggedIn ? /*#__PURE__*/external_React_default().createElement(SignOutButton, null) : /*#__PURE__*/external_React_default().createElement(SignInButton, null);
  }));
};

var NavBarLogo = function NavBarLogo(props) {
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: "vertical-center"
  }, /*#__PURE__*/external_React_default().createElement("a", {
    className: "navbar-brand",
    href: "#"
  }, /*#__PURE__*/external_React_default().createElement("img", {
    src: "img/maki.png",
    alt: "maki-logo",
    width: props.imgWidth,
    height: props.imgHeight
  })));
};

var SignContentUserDetail = function SignContentUserDetail(props) {
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: "ms-auto me-2"
  }, props.text);
};

var SignButton = function SignButton(props) {
  return /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement("button", {
    className: "btn btn-primary",
    onClick: function onClick() {
      return props.clickHandler();
    }
  }, props.label)));
};

var SignInButton = function SignInButton() {
  return /*#__PURE__*/external_React_default().createElement(SignButton, {
    clickHandler: Auth.userSignIn,
    label: "Se Connecter"
  });
};

var SignOutButton = function SignOutButton() {
  return /*#__PURE__*/external_React_default().createElement(SignButton, {
    clickHandler: Auth.userSignOut,
    label: "Se D\xE9connecter"
  });
};
;// CONCATENATED MODULE: ./src/Widgets/Jumbotron.tsx

var Jumbotron = function Jumbotron() {
  return /*#__PURE__*/external_React_default().createElement("section", {
    className: "jumbotron text-center"
  }, /*#__PURE__*/external_React_default().createElement(JumbotronBanneer, null), /*#__PURE__*/external_React_default().createElement(MainTitle, null), /*#__PURE__*/external_React_default().createElement(TagLine, null));
};

var JumbotronBanneer = function JumbotronBanneer() {
  return /*#__PURE__*/external_React_default().createElement("img", {
    src: "img/maki.png",
    alt: "cutest cat ever",
    id: "maki-banneer"
  });
};

var MainTitle = function MainTitle() {
  return /*#__PURE__*/external_React_default().createElement("h1", {
    className: "main-title"
  }, "Cat Mash");
};

var TagLine = function TagLine() {
  return /*#__PURE__*/external_React_default().createElement("p", {
    className: "tagline"
  }, "Qui sera le chat le plus mignon ?");
};
;// CONCATENATED MODULE: ./src/Models/Vote.ts
var Vote;

(function (Vote) {
  Vote[Vote["Blank"] = 0] = "Blank";
  Vote[Vote["Img1"] = 1] = "Img1";
  Vote[Vote["Img2"] = 2] = "Img2";
})(Vote || (Vote = {}));
;// CONCATENATED MODULE: ./src/Services/VoteContext.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function VoteContext_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VoteContext_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VoteContext_createClass(Constructor, protoProps, staticProps) { if (protoProps) VoteContext_defineProperties(Constructor.prototype, protoProps); if (staticProps) VoteContext_defineProperties(Constructor, staticProps); return Constructor; }



var VoteContextData = /*#__PURE__*/function () {
  function VoteContextData(proposalId, image1, image2, vote) {
    VoteContext_classCallCheck(this, VoteContextData);

    this.proposalId = proposalId;
    this.image1 = image1;
    this.image2 = image2;
    this.vote = vote;
  }

  VoteContext_createClass(VoteContextData, [{
    key: "with",
    value: function _with(fieldsToUpdate) {
      return _objectSpread(_objectSpread({}, this), fieldsToUpdate);
    }
  }, {
    key: "toggleImage1Vote",
    value: function toggleImage1Vote() {
      var newVote = this.vote === Vote.Img1 ? Vote.Blank : Vote.Img1;
      return this["with"]({
        vote: newVote
      });
    }
  }, {
    key: "toggleImage2Vote",
    value: function toggleImage2Vote() {
      var newVote = this.vote === Vote.Img2 ? Vote.Blank : Vote.Img2;
      return this["with"]({
        vote: newVote
      });
    }
  }], [{
    key: "unitialized",
    value: function unitialized() {
      return null;
    }
  }]);

  return VoteContextData;
}();
var VoteContext = /*#__PURE__*/external_React_default().createContext(null);
;// CONCATENATED MODULE: ./src/Widgets/VotePanel.tsx



var VotePanel = function VotePanel() {
  return /*#__PURE__*/external_React_default().createElement(VoteContext.Consumer, null, function (vote) {
    if (vote) {
      var img1State;
      var img2State;

      switch (vote.vote) {
        case Vote.Blank:
          img1State = CatImgState.Neutral;
          img2State = CatImgState.Neutral;
          break;

        case Vote.Img1:
          img1State = CatImgState.Selected;
          img2State = CatImgState.Unselected;
          break;

        case Vote.Img2:
          img1State = CatImgState.Unselected;
          img2State = CatImgState.Selected;
          break;
      }

      return /*#__PURE__*/external_React_default().createElement("section", {
        className: "row align-items-center justify-content-center"
      }, /*#__PURE__*/external_React_default().createElement(CatColumn, {
        imgSrc: "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg",
        imgState: img1State,
        clickHandler: vote.toggleImage1Vote
      }), /*#__PURE__*/external_React_default().createElement(CatColumn, {
        imgSrc: "http://25.media.tumblr.com/tumblr_m4pwa9EXE41r6jd7fo1_500.jpg",
        imgState: img2State,
        clickHandler: vote.toggleImage2Vote
      }), /*#__PURE__*/external_React_default().createElement(VoteRow, null));
    } else {
      return /*#__PURE__*/external_React_default().createElement("div", {
        className: "text-center my-5"
      }, "2 secondes, je cherche des petits chats...");
    }
  });
};
var CatImgState;

(function (CatImgState) {
  CatImgState[CatImgState["Neutral"] = 0] = "Neutral";
  CatImgState[CatImgState["Selected"] = 1] = "Selected";
  CatImgState[CatImgState["Unselected"] = 2] = "Unselected";
})(CatImgState || (CatImgState = {}));

var stateToClassMap = new Map([[CatImgState.Neutral, ""], [CatImgState.Selected, "cat-selected"], [CatImgState.Unselected, "cat-unselected"]]);

var CatColumn = function CatColumn(props) {
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: "col cat-col"
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: "cat-img-container p-3 ".concat(stateToClassMap.get(props.imgState))
  }, /*#__PURE__*/external_React_default().createElement("img", {
    src: props.imgSrc,
    onClick: function onClick() {
      return props.clickHandler();
    }
  })));
};

var VoteRow = function VoteRow() {
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: "text-center mt-2"
  }, /*#__PURE__*/external_React_default().createElement(VoteButton, null));
};

var VoteButton = function VoteButton() {
  return /*#__PURE__*/external_React_default().createElement("button", {
    className: "btn btn-primary"
  }, "Voter !");
};
;// CONCATENATED MODULE: ./src/Widgets/Footer.tsx

var Footer = function Footer() {
  return /*#__PURE__*/external_React_default().createElement("footer", {
    className: "text-center mt-2"
  }, "R\xE9alis\xE9 par ", /*#__PURE__*/external_React_default().createElement("a", {
    href: "www.github.com/PierreLemmel"
  }, "Pierre Lemmel"), " pour ", /*#__PURE__*/external_React_default().createElement("a", {
    href: "https://latelier.co"
  }, "L'Atelier"));
};
;// CONCATENATED MODULE: ./src/App.tsx
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var App = function App() {
  var _React$useState = external_React_default().useState(Auth.AppUser.LoggedOut()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      authState = _React$useState2[0],
      setAuthState = _React$useState2[1];

  var _React$useState3 = external_React_default().useState(VoteContextData.unitialized),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      voteState = _React$useState4[0],
      setVoteState = _React$useState4[1];

  Auth.onAuthStateChanged(function (user) {
    return setAuthState(user);
  });
  return /*#__PURE__*/external_React_default().createElement("div", {
    id: "app"
  }, /*#__PURE__*/external_React_default().createElement(AuthContext.Provider, {
    value: authState
  }, /*#__PURE__*/external_React_default().createElement(VoteContext.Provider, {
    value: voteState
  }, /*#__PURE__*/external_React_default().createElement(NavBar, null), /*#__PURE__*/external_React_default().createElement(Jumbotron, null), /*#__PURE__*/external_React_default().createElement(VotePanel, null), /*#__PURE__*/external_React_default().createElement(Footer, null))));
};
;// CONCATENATED MODULE: ./src/index.tsx



external_ReactDOM_default().render( /*#__PURE__*/external_React_default().createElement(App, null), document.getElementById('root'));
/******/ })()
;