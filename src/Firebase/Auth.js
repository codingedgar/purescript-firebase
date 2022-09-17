// @ts-check
const {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  sendEmailVerification,
  useDeviceLanguage,
  onIdTokenChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} = require("firebase/auth");

exports.createUserWithEmailAndPasswordImp = function (email, password, auth) {
  return function () {
    return createUserWithEmailAndPassword(auth, email, password);
  }
}

exports.signInAnonymouslyImp = function (auth) {
  return function () {
    return signInAnonymously(auth);
  }
}

exports.signInWithEmailAndPasswordImp = function (email, password, auth) {
  return function () {
    return signInWithEmailAndPassword(auth, email, password);
  }
}

exports.onAuthStateChangedImp = function (callback, auth) {
  return function () {
    return onAuthStateChanged(auth, user => {
      callback(user)();
    });
  }
}

exports.signOutImp = function (auth) {
  return function () {
    return signOut(auth);
  }
}

/**
 * 
 * @param {import("firebase/auth").User} user 
 */
exports.getUserIdTokenImp = function (user, force) {
  return function () {
    return user.getIdToken(force)
  }
}


/**
 * 
 * @param {import("firebase/app").FirebaseApp} firebase 
 * @returns {() => import("firebase/auth").Auth}
 */
exports.getAuthImp = function (firebase) {
  return function () {
    return getAuth(firebase);
  }
}

// TODO: correctly type ActionCodeSettings in PS
/**
 * 
 * @param {import("firebase/auth").User} user
 * @param {import("firebase/auth").ActionCodeSettings | undefined | null} config
 * @returns {() => Promise<void>}
 */
exports.sendEmailVerificationImp = function (user, config) {
  return function () {
    return sendEmailVerification(user, config)
  }
}

// TODO: Finish to map locales
/**
 * @typedef {"es" | "es_419" | "en"} Locale
 */
// Code	Language
// ar	Arabic
// bg	Bulgarian
// ca	Catalan
// zh_cn	Chinese (Simplified)
// zh_tw	Chinese (Traditional)
// hr	Croatian
// cs	Czech
// da	Danish
// nl	Dutch
// en	English
// en_gb	English (UK)
// fa	Farsi€
// fil	Filipino
// fi	Finnish
// fr	French
// de	German
// el	Greek
// iw	Hebrew
// hi	Hindi
// hu	Hungarian
// id	Indonesian
// it	Italian
// ja	Japanese
// ko	Korean
// lv	Latvian
// lt	Lithuanian
// no	Norwegian (Bokmal)
// pl	Polish
// pt_br	Portuguese (Brazil)
// pt_pt	Portuguese (Portugal)
// ro	Romanian
// ru	Russian
// sr	Serbian
// sk	Slovak
// sl	Slovenian
// es	Spanish
// es_419	Spanish (Latin America)
// sv	Swedish
// th	Thai
// tr	Turkish
// uk	Ukrainian
// vi	Vietnamese

/**
 * 
 * @param {import("firebase/auth").Auth} auth
 * @param { Locale } languageCode
 * @returns {() => void}
 */
exports.setLanguageCodeImp = function (auth, languageCode) {
  return function () {
    auth.languageCode = languageCode
  }
}

/**
 * 
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => void}
 */
exports.getLanguageCodeImp = function (auth) {
  return function () {
    auth.languageCode
  }
}

/**
 * 
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => Void}
 */
exports.useDeviceLanguageImp = function (auth) {
  return function () {
    return useDeviceLanguage(auth)
  }
}

/**
 * 
 * @param {(u: import("firebase/auth").User | null) => () => void} callback
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => () => Void} Unsubscribe
 */
exports.onIdTokenChangedImp = function (callback, auth) {
  return function () {
    return onIdTokenChanged(auth, user => {
      callback(user)();
    })
  }
}

/**
 * 
 * @param {import("firebase/auth").ActionCodeSettings} actionCodeSettings
 * @param {String} email
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => Promise<Void>}
 */
exports.sendSignInLinkToEmailImp = function (actionCodeSettings, email, auth) {
  return function () {
    return sendSignInLinkToEmail(auth, email, actionCodeSettings)
  }
}

/**
 * 
 * @param {String} emailLink
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => Boolean}
 */
exports.isSignInWithEmailLinkImp = function (emailLink, auth) {
  return function () {
    return isSignInWithEmailLink(auth, emailLink)
  }
}

/**
 * 
 * @param {String} emailLink
 * @param {String} email
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => Promise<import("firebase/auth").UserCredential>}
 */
exports.signInWithEmailLinkImp = function (emailLink, email, auth) {
  return function () {
    return signInWithEmailLink(auth, email, emailLink)
  }
}
