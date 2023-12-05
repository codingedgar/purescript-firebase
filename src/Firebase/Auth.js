import {
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
} from "firebase/auth";

export {
  getIdTokenResult as _getIdTokenResult,
} from "firebase/auth";

export function createUserWithEmailAndPasswordImp(email, password, auth) {
  return function () {
    return createUserWithEmailAndPassword(auth, email, password);
  }
}

export function signInAnonymouslyImp(auth) {
  return function () {
    return signInAnonymously(auth);
  }
}

export function signInWithEmailAndPasswordImp(email, password, auth) {
  return function () {
    return signInWithEmailAndPassword(auth, email, password);
  }
}

export function onAuthStateChangedImp(callback, auth) {
  return function () {
    return onAuthStateChanged(auth, user => {
      callback(user)();
    });
  }
}

export function signOutImp(auth) {
  return function () {
    return signOut(auth);
  }
}

/**
 * 
 * @param {import("firebase/auth").User} user 
 */
export function getUserIdTokenImp(user, force) {
  return function () {
    return user.getIdToken(force)
  }
}


/**
 * 
 * @param {import("firebase/app").FirebaseApp} firebase 
 * @returns {() => import("firebase/auth").Auth}
 */
export function getAuthImp(firebase) {
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
export function sendEmailVerificationImp(user, config) {
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
export function setLanguageCodeImp(auth, languageCode) {
  return function () {
    auth.languageCode = languageCode
  }
}

/**
 * 
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => void}
 */
export function getLanguageCodeImp(auth) {
  return function () {
    auth.languageCode
  }
}

/**
 * 
 * @param {import("firebase/auth").Auth} auth
 * @returns {() => Void}
 */
export function useDeviceLanguageImp(auth) {
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
export function onIdTokenChangedImp(callback, auth) {
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
export function sendSignInLinkToEmailImp(actionCodeSettings, email, auth) {
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
export function isSignInWithEmailLinkImp(emailLink, auth) {
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
export function signInWithEmailLinkImp(emailLink, email, auth) {
  return function () {
    return signInWithEmailLink(auth, email, emailLink)
  }
}
