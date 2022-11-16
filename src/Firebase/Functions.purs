module Firebase.Functions where

import Prelude

import Data.Argonaut (Json)
import Control.Promise (Promise, toAff)
import Data.Function.Uncurried (Fn2, runFn2)
import Effect.Aff (Aff)
import Firebase.App (FirebaseApp)

foreign import data Functions :: Type
foreign import data HttpsCallable :: Type

foreign import _httpsCallable :: forall  requestData. Fn2 Functions String  (requestData -> Promise Json)

httpsCallable :: forall  requestData. Functions ->  String -> (requestData -> Aff Json)
httpsCallable functions name = runFn2 _httpsCallable functions name >>> toAff

foreign import _getFunctions :: FirebaseApp -> Functions

getFunctions :: FirebaseApp -> Functions
getFunctions = _getFunctions
