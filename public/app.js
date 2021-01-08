var whenSignedIn = document.getElementById('whenSignedIn');
var whenSignedOut = document.getElementById('whenSignedOut');

var signInBtn = document.getElementById('signInBtn');
var signOutBtn = document.getElementById('signOutBtn');

var userDetails = document.getElementById('userDetails');

var auth = firebase.auth();
var authProvider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = function () {
    return auth.signInWithPopup(authProvider);
};
signOutBtn.onclick = function () {
    return auth.signOut();
};

auth.onAuthStateChanged(function (user) {
    if (user) {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = 'Connect\xE9 en tant que <em>' + user.displayName + '</em>';
    } else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = 'Non connecté';
    }
});
var TestReact = function TestReact() {
  return React.createElement(
    "div",
    null,
    "Hello world"
  );
};
