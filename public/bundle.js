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
;// CONCATENATED MODULE: ./src/Models/SubmitVoteModel.ts
function SubmitVoteModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubmitVoteModel = function SubmitVoteModel(proposalId, userId, imgId) {
  SubmitVoteModel_classCallCheck(this, SubmitVoteModel);

  this.proposalId = proposalId;
  this.userId = userId;
  this.imgId = imgId;
};
;// CONCATENATED MODULE: ./src/Models/Vote.ts
var Vote;

(function (Vote) {
  Vote[Vote["Blank"] = 0] = "Blank";
  Vote[Vote["Img1"] = 1] = "Img1";
  Vote[Vote["Img2"] = 2] = "Img2";
})(Vote || (Vote = {}));
;// CONCATENATED MODULE: ./src/Models/ImageModel.ts
function ImageModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageModel = function ImageModel(id, src) {
  ImageModel_classCallCheck(this, ImageModel);

  this.id = id;
  this.src = src;
};
;
;// CONCATENATED MODULE: ./src/Models/ProposalModel.ts
function ProposalModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProposalModel = function ProposalModel(proposalId, userId, img1, img2) {
  ProposalModel_classCallCheck(this, ProposalModel);

  this.proposalId = proposalId;
  this.userId = userId;
  this.img1 = img1;
  this.img2 = img2;
};
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./src/Services/Api.ts
function Api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Api_createClass(Constructor, protoProps, staticProps) { if (protoProps) Api_defineProperties(Constructor.prototype, protoProps); if (staticProps) Api_defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Api;

(function (_Api) {
  var fakeDelay = 400;

  function getProposal(userId) {
    var proposal = new ProposalModel(esm_browser_v4(), userId, FakeDb.getRandomImage(), FakeDb.getRandomImage()); // Emulating data loading

    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve(proposal);
      }, fakeDelay);
    });
  }

  _Api.getProposal = getProposal;

  function submitVote(vote) {
    return new Promise(function (resolve) {
      return setTimeout(function () {
        return console.log('Vote submitted');
      });
    });
  }

  _Api.submitVote = submitVote;

  var FakeDb = /*#__PURE__*/function () {
    function FakeDb() {
      Api_classCallCheck(this, FakeDb);
    }

    Api_createClass(FakeDb, null, [{
      key: "getRandomImage",
      value: function getRandomImage() {
        var randIndex = Math.round(Math.random() * (FakeDb.fakeDb.length - 1));
        return FakeDb.fakeDb[randIndex];
      }
    }]);

    return FakeDb;
  }();

  _defineProperty(FakeDb, "fakeDb", [new ImageModel("MTgwODA3MA", "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg"), new ImageModel("tt", "http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg"), new ImageModel("bmp", "http://25.media.tumblr.com/tumblr_m4bgd9OXmw1qioo2oo1_500.jpg"), new ImageModel("c8a", "http://24.media.tumblr.com/tumblr_lzxok2e2kX1qgjltdo1_1280.jpg"), new ImageModel("3kj", "http://25.media.tumblr.com/tumblr_m33r7lpy361qzi9p6o1_500.jpg"), new ImageModel("9pu", "http://25.media.tumblr.com/tumblr_m2p6dxhxul1qdvz31o1_500.jpg"), new ImageModel("aca", "http://24.media.tumblr.com/tumblr_m1ku66jPWV1qze0hyo1_400.jpg"), new ImageModel("ebk", "http://25.media.tumblr.com/tumblr_m4pwa9EXE41r6jd7fo1_500.jpg"), new ImageModel("MTg0MTYyOQ", "http://25.media.tumblr.com/tumblr_m6x62cjEz31qk4s2co1_1280.jpg"), new ImageModel("6mo", "http://25.media.tumblr.com/tumblr_lyj0y5tg4L1qbwemzo1_1280.jpg"), new ImageModel("4m5", "http://25.media.tumblr.com/tumblr_m44w9nI50Y1qzyqubo1_500.jpg"), new ImageModel("5v3", "http://24.media.tumblr.com/tumblr_lzqv50jiCj1qzex9io1_1280.jpg"), new ImageModel("52k", "http://25.media.tumblr.com/tumblr_lrlhw46Re81r3q92to1_500.jpg"), new ImageModel("47s", "http://25.media.tumblr.com/tumblr_m3u1mfIZwv1rtqthio1_500.jpg"), new ImageModel("77s", "http://25.media.tumblr.com/Jjkybd3nS98hfqy8vevnj6R9_500.jpg"), new ImageModel("8g6", "http://25.media.tumblr.com/tumblr_m4j6icIQdF1qzex9io1_1280.jpg"), new ImageModel("6cu", "http://25.media.tumblr.com/5gI3dw08Qncg15r8LBMo8NMZo1_400.jpg"), new ImageModel("71f", "http://24.media.tumblr.com/tumblr_lg1hnknXjm1qfyzelo1_1280.jpg"), new ImageModel("2pp", "http://25.media.tumblr.com/tumblr_kstpz9IxDK1qzefipo1_250.gif"), new ImageModel("e6d", "http://25.media.tumblr.com/tumblr_m4s05iYQmN1r6jd7fo1_500.gif"), new ImageModel("99t", "http://24.media.tumblr.com/tumblr_m2gyauUXoh1qbe5pxo1_500.jpg"), new ImageModel("510", "http://24.media.tumblr.com/tumblr_ltqi8k2OcP1qiyvcfo1_250.jpg"), new ImageModel("9u3", "http://25.media.tumblr.com/tumblr_m20iu31nBD1qz4dkmo1_500.jpg"), new ImageModel("1dp", "http://24.media.tumblr.com/tumblr_m11rjz2nrk1qznh2ao1_1280.jpg"), new ImageModel("b8p", "http://25.media.tumblr.com/tumblr_luvlehQz7n1qgnva2o1_500.jpg"), new ImageModel("7q3", "http://25.media.tumblr.com/tumblr_m2wvwmHrX61r73wdao1_250.gif"), new ImageModel("8v5", "http://24.media.tumblr.com/tumblr_m0ljiiZ08O1r7plk4o1_500.jpg"), new ImageModel("37p", "http://24.media.tumblr.com/tumblr_lw9hu39q621qdvbl3o1_1280.jpg"), new ImageModel("2n0", "http://29.media.tumblr.com/tumblr_m1k4ze7hja1r6b7kmo1_500.jpg"), new ImageModel("ckc", "http://24.media.tumblr.com/tumblr_lnvz6gLbjS1qji0t2o1_500.jpg"), new ImageModel("27m", "http://27.media.tumblr.com/tumblr_lh6ywkF22D1qfyzelo1_1280.jpg"), new ImageModel("di6", "http://25.media.tumblr.com/tumblr_m4rorb74ne1qkk65ko1_1280.jpg"), new ImageModel("afr", "http://24.media.tumblr.com/tumblr_m44tfdCUcz1qzgoy8o1_1280.jpg"), new ImageModel("65s", "http://24.media.tumblr.com/tumblr_luu4l5AmkP1qzxrnuo1_1280.jpg"), new ImageModel("abs", "http://25.media.tumblr.com/tumblr_m1mls6SBfO1qze0hyo1_1280.jpg"), new ImageModel("MjAxMTk1Mw", "http://24.media.tumblr.com/tumblr_mcg6abzbmT1qejbiro1_500.jpg"), new ImageModel("6hn", "http://24.media.tumblr.com/tumblr_lqhtuoG1by1qbhms5o1_500.jpg"), new ImageModel("e82", "http://25.media.tumblr.com/tumblr_m4rwuzEHVz1r6jd7fo1_1280.jpg"), new ImageModel("bgf", "http://25.media.tumblr.com/tumblr_lgt0zjaTik1qgnva2o1_500.png"), new ImageModel("93m", "http://25.media.tumblr.com/tumblr_lu8wwx12zx1qlyuwso1_1280.jpg"), new ImageModel("MTY1Mjg5NQ", "http://25.media.tumblr.com/tumblr_m4vzekUu7G1r6b7kmo1_500.jpg"), new ImageModel("3dr", "http://24.media.tumblr.com/tumblr_lvfpb18iea1qi23vmo1_500.jpg"), new ImageModel("8o4", "http://25.media.tumblr.com/tumblr_lx6uh8RO4r1qenqklo1_1280.jpg"), new ImageModel("8g1", "http://25.media.tumblr.com/tumblr_m3g4wzlmaK1qzex9io1_500.jpg"), new ImageModel("3s9", "http://24.media.tumblr.com/tumblr_m3gl5xsZGq1r73wdao1_1280.jpg"), new ImageModel("bjp", "http://24.media.tumblr.com/tumblr_m4l704E3mL1qdajm7o1_500.jpg"), new ImageModel("cgp", "http://25.media.tumblr.com/tumblr_lql6c16YhH1qdth8zo1_1280.jpg"), new ImageModel("1e6", "http://24.media.tumblr.com/tumblr_m0umerwZ3L1qznclro1_1280.jpg"), new ImageModel("3b8", "http://24.media.tumblr.com/tumblr_m3pv11WNcO1r5c1jmo1_1280.jpg"), new ImageModel("9us", "http://24.media.tumblr.com/tumblr_m1uu8abTLM1qd477zo1_500.jpg"), new ImageModel("MTY4NDQ5NQ", "http://25.media.tumblr.com/tumblr_m4apapdhVj1r18oqso1_500.jpg"), new ImageModel("bu5", "http://25.media.tumblr.com/tumblr_m3gaff05EE1qddbvio1_500.jpg"), new ImageModel("3ic", "http://24.media.tumblr.com/tumblr_m3nbobox8B1qj638ro1_1280.jpg"), new ImageModel("8q", "http://25.media.tumblr.com/tumblr_llahls2IeS1qjmniro1_250.gif"), new ImageModel("ck8", "http://24.media.tumblr.com/tumblr_lnvyrt5j1M1qce7tgo1_500.gif"), new ImageModel("s7", "http://30.media.tumblr.com/tumblr_m2b0ykP6Fu1qzex9io1_1280.jpg"), new ImageModel("is", "http://29.media.tumblr.com/tumblr_ly4w9oJVgE1r189uao1_500.jpg"), new ImageModel("2r3", "http://28.media.tumblr.com/qgIb8tERiqzchkc2UFsyedLmo1_500.jpg"), new ImageModel("btv", "http://25.media.tumblr.com/tumblr_m4habeFR271qd477zo1_1280.jpg"), new ImageModel("e3a", "http://25.media.tumblr.com/tumblr_m20bftDngo1qejbiro1_1280.jpg"), new ImageModel("al8", "http://24.media.tumblr.com/tumblr_lehgc4thel1qecpy9o1_500.gif"), new ImageModel("56s", "http://25.media.tumblr.com/tumblr_kqai1e03j91qzv5pwo1_500.jpg"), new ImageModel("aj6", "http://24.media.tumblr.com/tumblr_ku726anOmb1qzrlhgo1_500.png"), new ImageModel("46h", "http://25.media.tumblr.com/tumblr_m3tpx8fsXX1qhwmnpo1_400.jpg"), new ImageModel("bd8", "http://25.media.tumblr.com/tumblr_lhe1fu7JpG1qgnva2o1_500.png"), new ImageModel("45k", "http://24.media.tumblr.com/tumblr_m43mq45fgs1qzxrnuo1_1280.jpg"), new ImageModel("bjc", "http://25.media.tumblr.com/tumblr_m4mo17vXSa1r6jd7fo1_500.jpg"), new ImageModel("5ts", "http://25.media.tumblr.com/tumblr_m1oyzmlqEu1rsf53jo1_1280.jpg"), new ImageModel("chk", "http://25.media.tumblr.com/tumblr_lpl0cy8o5R1qdth8zo1_1280.jpg"), new ImageModel("ca8", "http://24.media.tumblr.com/tumblr_lz5pu74OPk1qgjltdo1_1280.jpg"), new ImageModel("MTU0NzgwMA", "http://25.media.tumblr.com/tumblr_m7cjk9zTNM1qzex9io1_1280.jpg"), new ImageModel("ddp", "http://25.media.tumblr.com/tumblr_m4gtikn86b1qztc0jo1_1280.jpg"), new ImageModel("e03", "http://25.media.tumblr.com/tumblr_m2xlwaadCC1qejbiro1_1280.jpg"), new ImageModel("9mk", "http://24.media.tumblr.com/GxlDeM8kxl6gszkaC1RgD776o1_1280.jpg"), new ImageModel("3gm", "http://25.media.tumblr.com/tumblr_m3khmzDXEo1qjc1a7o1_1280.jpg"), new ImageModel("6lo", "http://25.media.tumblr.com/tumblr_lz8fwef0VA1qzv52ko1_1280.jpg"), new ImageModel("MjA2NTY1NQ", "http://25.media.tumblr.com/tumblr_ma7j0aGNbB1r6jd7fo1_1280.jpg"), new ImageModel("41c", "http://25.media.tumblr.com/tumblr_m3pm45zC4v1qjahcpo1_500.jpg"), new ImageModel("54m", "http://25.media.tumblr.com/tumblr_lqv93f3ZQT1qi3974o1_500.jpg"), new ImageModel("bjf", "http://24.media.tumblr.com/tumblr_m2lim4Wocd1qjev1to1_1280.jpg"), new ImageModel("e9h", "http://25.media.tumblr.com/tumblr_m4qdjuybqb1r0wqrdo1_1280.jpg"), new ImageModel("ec6", "http://25.media.tumblr.com/tumblr_m4pvakprVF1r6jd7fo1_500.jpg"), new ImageModel("4ge", "http://25.media.tumblr.com/tumblr_m2g2ksSLML1qgkc80o1_400.gif"), new ImageModel("ds4", "http://25.media.tumblr.com/tumblr_m3uxadNlfI1qejbiro1_1280.jpg"), new ImageModel("MTcwMTgxMg", "http://25.media.tumblr.com/tumblr_mc1lz78RNn1qjc1a7o1_1280.jpg"), new ImageModel("7ts", "http://24.media.tumblr.com/tumblr_lht68lybsE1qcn249o1_250.gif"), new ImageModel("d5c", "http://25.media.tumblr.com/tumblr_lidvsekFL91qzabkfo1_1280.jpg"), new ImageModel("6jf", "http://25.media.tumblr.com/tumblr_lpcq3447RK1qbhms5o1_500.jpg"), new ImageModel("MTY4MDkyOA", "http://25.media.tumblr.com/tumblr_mbe1tuRvoN1rxer0vo1_1280.jpg"), new ImageModel("8hk", "http://25.media.tumblr.com/tumblr_m47yaokX791qhwmnpo1_500.jpg"), new ImageModel("5no", "http://24.media.tumblr.com/tumblr_ll3uw0KDeM1qb8a3ro1_500.jpg"), new ImageModel("e3v", "http://24.media.tumblr.com/tumblr_m1nn0aPJU31qejbiro1_1280.jpg"), new ImageModel("dp", "http://28.media.tumblr.com/tumblr_ly7rtpsCSc1qgop81o1_1280.jpg"), new ImageModel("6jt", "http://24.media.tumblr.com/tumblr_lowyfwTewp1qbhms5o1_500.jpg"), new ImageModel("1qj", "http://27.media.tumblr.com/tumblr_lwaso5dl5N1qbhms5o1_500.jpg"), new ImageModel("5io", "http://25.media.tumblr.com/tumblr_lst9zbbAGx1r4xjo2o1_1280.jpg"), new ImageModel("46o", "http://25.media.tumblr.com/tumblr_m44vnvR00W1rtuomto1_1280.jpg"), new ImageModel("4lt", "http://24.media.tumblr.com/tumblr_kujwmnKr8k1qzpwi0o1_250.gif"), new ImageModel("6ps", "http://25.media.tumblr.com/tumblr_lwip0fnA2D1qzv52ko1_1280.jpg"), new ImageModel("a4e", "http://25.media.tumblr.com/tumblr_m3jbdxqnma1qa8o34o1_500.jpg")]);
})(Api || (Api = {}));
;// CONCATENATED MODULE: ./src/Services/VoteContext.ts
function VoteContext_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VoteContext_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VoteContext_createClass(Constructor, protoProps, staticProps) { if (protoProps) VoteContext_defineProperties(Constructor.prototype, protoProps); if (staticProps) VoteContext_defineProperties(Constructor, staticProps); return Constructor; }



var VoteContextObject = /*#__PURE__*/function () {
  function VoteContextObject(initialized, proposalId, image1, image2, vote) {
    VoteContext_classCallCheck(this, VoteContextObject);

    this.initialized = initialized;
    this.proposalId = proposalId;
    this.image1 = image1;
    this.image2 = image2;
    this.vote = vote;
  }

  VoteContext_createClass(VoteContextObject, null, [{
    key: "uninitialized",
    value: function uninitialized() {
      return new VoteContextObject(false, null, null, null, Vote.Blank);
    }
  }, {
    key: "initialized",
    value: function initialized(proposalId, image1, image2) {
      return new VoteContextObject(true, proposalId, image1, image2, Vote.Blank);
    }
  }]);

  return VoteContextObject;
}();
var VoteContext = /*#__PURE__*/external_React_default().createContext(VoteContextObject.uninitialized());
;// CONCATENATED MODULE: ./src/Widgets/VotePanel.tsx
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var initialized = false; // Can't use state to track this information

var VotePanel = function VotePanel() {
  var _React$useState = external_React_default().useState({
    vote: VoteContextObject.uninitialized(),
    busy: true
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  return /*#__PURE__*/external_React_default().createElement(AuthContext.Consumer, null, function (auth) {
    var waitForKittens = function waitForKittens() {
      Api.getProposal(auth.uid).then(function (proposal) {
        var newState = VoteContextObject.initialized(proposal.proposalId, proposal.img1, proposal.img2);
        setState({
          vote: newState,
          busy: true
        });
      });
    };

    if (!initialized) {
      waitForKittens();
      initialized = true;
    }

    var setNewVote = function setNewVote(newVote) {
      return setState({
        vote: new VoteContextObject(true, state.vote.proposalId, state.vote.image1, state.vote.image2, newVote),
        busy: state.busy
      });
    };

    var toggleImage1 = function toggleImage1() {
      var newVote = state.vote.vote === Vote.Img1 ? Vote.Blank : Vote.Img1;
      setNewVote(newVote);
    };

    var toggleImage2 = function toggleImage2() {
      var newVote = state.vote.vote === Vote.Img2 ? Vote.Blank : Vote.Img2;
      setNewVote(newVote);
    };

    var submitVote = function submitVote() {
      var imgId = state.vote.vote === Vote.Img1 ? state.vote.image1.id : state.vote.image2.id;
      Api.submitVote(new SubmitVoteModel(state.vote.proposalId, auth.uid, imgId)).then(function () {
        return console.log("Vote submitted");
      });
      setState({
        vote: VoteContextObject.uninitialized(),
        busy: true
      });
      waitForKittens();
      var audio = new Audio('meow.mp3');
      audio.play();
    };

    return /*#__PURE__*/external_React_default().createElement(VoteContext.Provider, {
      value: state.vote
    }, /*#__PURE__*/external_React_default().createElement(VotePanelContent, {
      toggleImage1: toggleImage1,
      toggleImage2: toggleImage2,
      submitVote: submitVote
    }));
  });
};

var VotePanelContent = function VotePanelContent(props) {
  return /*#__PURE__*/external_React_default().createElement(VoteContext.Consumer, null, function (vote) {
    if (vote.initialized) {
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
        imgSrc: vote.image1.src,
        imgState: img1State,
        clickHandler: props.toggleImage1
      }), /*#__PURE__*/external_React_default().createElement(CatColumn, {
        imgSrc: vote.image2.src,
        imgState: img2State,
        clickHandler: props.toggleImage2
      }), /*#__PURE__*/external_React_default().createElement(VoteRow, {
        submitVote: props.submitVote
      }));
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

var VoteRow = function VoteRow(props) {
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: "text-center mt-2"
  }, /*#__PURE__*/external_React_default().createElement(VoteButton, {
    submitVote: props.submitVote
  }));
};

var VoteButton = function VoteButton(props) {
  return /*#__PURE__*/external_React_default().createElement(VoteContext.Consumer, null, function (vote) {
    return /*#__PURE__*/external_React_default().createElement("button", {
      className: "btn btn-primary",
      disabled: vote.vote === Vote.Blank,
      onClick: function onClick() {
        return props.submitVote();
      }
    }, "Voter !");
  });
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
function App_slicedToArray(arr, i) { return App_arrayWithHoles(arr) || App_iterableToArrayLimit(arr, i) || App_unsupportedIterableToArray(arr, i) || App_nonIterableRest(); }

function App_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function App_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return App_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return App_arrayLikeToArray(o, minLen); }

function App_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function App_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function App_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var App = function App() {
  var _React$useState = external_React_default().useState(Auth.AppUser.LoggedOut()),
      _React$useState2 = App_slicedToArray(_React$useState, 2),
      authState = _React$useState2[0],
      setAuthState = _React$useState2[1];

  Auth.onAuthStateChanged(function (user) {
    return setAuthState(user);
  });
  return /*#__PURE__*/external_React_default().createElement("div", {
    id: "app"
  }, /*#__PURE__*/external_React_default().createElement(AuthContext.Provider, {
    value: authState
  }, /*#__PURE__*/external_React_default().createElement(NavBar, null), /*#__PURE__*/external_React_default().createElement(Jumbotron, null), /*#__PURE__*/external_React_default().createElement(VotePanel, null), /*#__PURE__*/external_React_default().createElement(Footer, null)));
};
;// CONCATENATED MODULE: ./src/index.tsx



external_ReactDOM_default().render( /*#__PURE__*/external_React_default().createElement(App, null), document.getElementById('root'));
/******/ })()
;