module Firebase.Auth
  ( Auth
  , User
  , createUserWithEmailAndPassword
  , getAuth
  , getLanguageCode
  , getUserIdToken
  , isSignInWithEmailLink
  , onAuthStateChanged
  , onIdTokenChanged
  , sendEmailVerification
  , sendEmailVerificationImp
  , sendSignInLinkToEmail
  , setLanguageCode
  , signInAnonymously
  , signInWithEmailAndPassword
  , signInWithEmailLink
  , signOut
  , useDeviceLanguage
  , Email(..)
  , ActionCodeSettings
  , UserCredential
  , LanguageCode(..)
  , getCurrentUser
  ) where

import Prelude

import Control.Monad.Except (runExcept)
import Control.Promise (Promise, toAffE)
import Data.Either (Either)
import Data.Function.Uncurried (Fn1, Fn2, Fn3, runFn1, runFn2, runFn3)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable, null, toMaybe)
import Effect (Effect)
import Effect.Aff (Aff)
import Firebase.App (FirebaseApp)
import Foreign (MultipleErrors, fail, readString)
import Foreign.Generic (Foreign, decode, encode, class Decode, class Encode, ForeignError(..))
import Unsafe.Coerce (unsafeCoerce)

foreign import data Auth :: Type

type User =
  { uid :: String
  , emailVerified :: Boolean
  }

data LanguageCode
  = Spanish
  | SpanishLatinAmerica
  | English

instance showLanguageCode :: Show LanguageCode where
  show = case _ of
    Spanish -> "es"
    SpanishLatinAmerica -> "es_419"
    English -> "en"

derive instance genericLanguageCode :: Generic LanguageCode _

instance encodeLanguageCode :: Encode LanguageCode where
  encode =
    case _ of
      Spanish -> "es"
      SpanishLatinAmerica -> "es_419"
      English -> "en"
      >>> encode

instance decodeLanguageCode :: Decode LanguageCode where
  decode s =
    readString s
      >>= case _ of
        "es" -> pure Spanish
        "es_419" -> pure SpanishLatinAmerica
        "en" -> pure English
        x -> fail $ ForeignError ("cannot place locale" <> x)

foreign import getAuthImp :: FirebaseApp -> Effect Auth

getAuth :: FirebaseApp -> Effect Auth
getAuth app = getAuthImp app

getCurrentUser :: Auth -> Maybe User
getCurrentUser auth = toMaybe (unsafeCoerce auth).currentUser

foreign import createUserWithEmailAndPasswordImp :: Fn3 String String Auth (Effect (Promise Unit))

createUserWithEmailAndPassword :: String -> String -> Auth -> Aff Unit
createUserWithEmailAndPassword email password auth = runFn3 createUserWithEmailAndPasswordImp email password auth # toAffE

foreign import signInAnonymouslyImp :: Fn1 Auth (Effect (Promise Unit))

signInAnonymously :: Auth -> Aff Unit
signInAnonymously auth = runFn1 signInAnonymouslyImp auth # toAffE

foreign import signInWithEmailAndPasswordImp :: Fn3 String String Auth (Effect (Promise Unit))

signInWithEmailAndPassword :: String -> String -> Auth -> Aff Unit
signInWithEmailAndPassword email password auth = runFn3 signInWithEmailAndPasswordImp email password auth # toAffE

-- TODO: add Unsubscribe
foreign import onAuthStateChangedImp :: Fn2 (Nullable User -> Effect Unit) Auth (Effect Unit)

onAuthStateChanged :: (Maybe User -> Effect Unit) -> Auth -> Effect Unit
onAuthStateChanged callback = runFn2 onAuthStateChangedImp (toMaybe >>> callback)

foreign import signOutImp :: Auth -> Effect (Promise Unit)

signOut :: Auth -> Aff Unit
signOut = signOutImp >>> toAffE

foreign import getUserIdTokenImp :: Fn2 User Boolean (Effect (Promise String))

getUserIdToken :: User -> Boolean -> Aff String
getUserIdToken user force = runFn2 getUserIdTokenImp user force # toAffE

type Unsubscribe = Effect Unit
type ActionCodeSettings =
  { url :: String
  , handleCodeInApp :: Boolean
  }

newtype Email = Email String
type UserCredential =
  { user :: User
  , operationType :: String
  }

foreign import sendEmailVerificationImp :: Fn2 User (Nullable ActionCodeSettings) (Effect (Promise Unit))

sendEmailVerification :: User -> Aff Unit
sendEmailVerification user = runFn2 sendEmailVerificationImp user null # toAffE

foreign import setLanguageCodeImp :: Fn2 Auth Foreign (Effect Unit)

setLanguageCode :: LanguageCode -> Auth -> Effect Unit
setLanguageCode lang auth = runFn2 setLanguageCodeImp auth (encode lang)

foreign import getLanguageCodeImp :: Fn1 Auth (Effect Foreign)

getLanguageCode :: Auth -> Effect (Either MultipleErrors LanguageCode)
getLanguageCode auth = runFn1 getLanguageCodeImp auth # map (decode >>> runExcept)

foreign import useDeviceLanguageImp :: Fn1 Auth (Effect Unit)

useDeviceLanguage :: Auth -> Effect (Unit)
useDeviceLanguage auth = runFn1 useDeviceLanguageImp auth

foreign import onIdTokenChangedImp :: Fn2 (User -> Effect Unit) Auth (Effect Unsubscribe)

onIdTokenChanged :: (User -> Effect Unit) -> Auth -> Effect (Unsubscribe)
onIdTokenChanged = runFn2 onIdTokenChangedImp

foreign import sendSignInLinkToEmailImp :: Fn3 ActionCodeSettings String Auth (Effect (Promise Unit))

sendSignInLinkToEmail :: ActionCodeSettings -> Email -> Auth -> Aff Unit
sendSignInLinkToEmail settings (Email email) =
  runFn3
    sendSignInLinkToEmailImp
    settings
    email
    >>> toAffE

foreign import isSignInWithEmailLinkImp :: Fn2 String Auth (Effect Boolean)

isSignInWithEmailLink :: String -> Auth -> Effect Boolean
isSignInWithEmailLink emailLink =
  runFn2
    isSignInWithEmailLinkImp
    emailLink

foreign import signInWithEmailLinkImp :: Fn3 String String Auth (Effect (Promise UserCredential))

signInWithEmailLink :: String -> Email -> Auth -> Aff UserCredential
signInWithEmailLink emailLink (Email email) =
  runFn3
    signInWithEmailLinkImp
    emailLink
    email
    >>> toAffE
