module Firebase.App
  ( initializeApp
  , FirebaseApp
  , FirebaseOptions
  , getApp
  , getApp'
  ) where

import Effect (Effect)

type FirebaseOptions =
  { apiKey :: String
  , authDomain :: String
  , projectId :: String
  , storageBucket :: String
  , messagingSenderId :: String
  , appId :: String
  }

foreign import data FirebaseApp :: Type

foreign import initializeAppImp :: FirebaseOptions -> Effect FirebaseApp

initializeApp :: FirebaseOptions -> Effect FirebaseApp
initializeApp = initializeAppImp

foreign import getAppImp :: String -> Effect FirebaseApp

getApp :: String -> Effect FirebaseApp
getApp name = getAppImp name

foreign import getApp2Imp :: Effect FirebaseApp

getApp' :: Effect FirebaseApp
getApp' = getApp2Imp
