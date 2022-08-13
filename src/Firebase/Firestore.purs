module Firebase.Firestore
  ( Firestore
  , CollectionReference
  , Query
  , QuerySnapshot
  , DocumentReference
  , QueryConstraint
  , QueryDocumentSnapshot
  , DocumentData
  , FirestoreError
  , WhereFilterOp
  , getFirestore
  , collection
  , filter
  , query
  , getDocs
  , foreach
  , getSnapshotData
  , getSnapshotDocs
  , doc
  , delete
  , onSnapshot
  , onDocSnapshot
  , getDocSnapshotData
  , isQuerySnapshotEmpty
  , setDoc
  , addDoc
  ) where

import Prelude

import Control.Promise (Promise, toAffE)
import Data.Argonaut.Core (Json)
import Data.Function.Uncurried (Fn1, Fn2, Fn3, Fn4, runFn1, runFn2, runFn3, runFn4)
import Data.Maybe (Maybe)
import Data.UndefinedOr (UndefinedOr, fromUndefined)
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Unsafe (unsafePerformEffect)
import PointFree ((..>))

foreign import data Firestore :: Type
foreign import data CollectionReference :: Type
foreign import data Query :: Type
foreign import data QuerySnapshot :: Type
foreign import data DocumentReference :: Type
foreign import data QueryConstraint :: Type
foreign import data QueryDocumentSnapshot :: Type
foreign import data DocumentData :: Type
foreign import data FirestoreError :: Type

data WhereFilterOp
  = LessThan
  | LessThanOrEqualTo
  | EqualTo

whereFilterOpToString :: WhereFilterOp -> String
whereFilterOpToString = case _ of
  LessThan -> "<"
  LessThanOrEqualTo -> "<="
  EqualTo -> "=="

foreign import getFirestoreImp :: Effect Firestore

getFirestore :: Effect Firestore
getFirestore = getFirestoreImp

foreign import collectionImp :: Fn2 String Firestore (Effect CollectionReference)

collection :: String -> Firestore -> Effect CollectionReference
collection = runFn2 collectionImp

foreign import whereImp :: Fn3 String String String (Effect QueryConstraint)

filter :: String -> WhereFilterOp -> String -> Effect QueryConstraint
filter path operator = runFn3 whereImp path (whereFilterOpToString operator)

foreign import queryImp :: Fn2 (Array QueryConstraint) CollectionReference (Effect Query)

query :: (Array QueryConstraint) -> CollectionReference -> Effect Query
query = runFn2 queryImp

foreign import getDocsImp :: Fn1 Query (Effect (Promise QuerySnapshot))

getDocs :: Query -> Aff QuerySnapshot
getDocs q = runFn1 getDocsImp q # toAffE

foreign import foreachImp :: Fn2 (QueryDocumentSnapshot -> Effect Unit) QuerySnapshot (Effect Unit)

foreach :: (QueryDocumentSnapshot -> Effect Unit) -> QuerySnapshot -> Effect Unit
foreach = runFn2 foreachImp

foreign import getSnapshotDocsImp :: Fn1 QuerySnapshot (Effect (Array QueryDocumentSnapshot))

getSnapshotDocs :: QuerySnapshot -> Effect (Array QueryDocumentSnapshot)
getSnapshotDocs = runFn1 getSnapshotDocsImp

foreign import getDocSnapshotDataImp :: Fn1 DocumentReference (Effect (UndefinedOr Json))

getDocSnapshotData :: DocumentReference -> Effect (Maybe Json)
getDocSnapshotData = runFn1 getDocSnapshotDataImp >>> map fromUndefined

foreign import getSnapshotDataImp :: Fn1 QueryDocumentSnapshot (Effect Json)

getSnapshotData :: QueryDocumentSnapshot -> (Effect Json)
getSnapshotData = runFn1 getSnapshotDataImp

foreign import docImp :: Fn3 Firestore String (Array String) (Effect DocumentReference)

doc :: String -> Array String -> Firestore -> (Effect DocumentReference)
doc path pathSegments db = runFn3 docImp db path pathSegments

foreign import deleteImp :: Fn1 DocumentReference (Effect (Promise Unit))

delete :: DocumentReference -> Aff Unit
delete = runFn1 deleteImp >>> toAffE

foreign import onSnapshotImp :: Fn4 (QuerySnapshot -> Unit) (FirestoreError -> Unit) (Unit -> Unit) Query (Effect (Effect Unit))

onSnapshot :: (QuerySnapshot -> Effect Unit) -> (FirestoreError -> Effect Unit) -> (Unit -> Effect Unit) -> Query -> Effect (Effect Unit)
onSnapshot onNext onError onComplete q =
  runFn4
    onSnapshotImp
    (\qs -> unsafePerformEffect (onNext qs))
    (\err -> unsafePerformEffect (onError err))
    (\_ -> unsafePerformEffect (onComplete unit))
    q

foreign import onDocSnapshotImp :: Fn4 DocumentReference (DocumentReference -> Unit) (FirestoreError -> Unit) (Unit -> Unit) (Effect (Effect Unit))

onDocSnapshot :: (DocumentReference -> Effect Unit) -> (FirestoreError -> Effect Unit) -> (Unit -> Effect Unit) -> DocumentReference -> Effect (Effect Unit)
onDocSnapshot onNext onError onComplete d =
  runFn4
    onDocSnapshotImp
    d
    (\qs -> unsafePerformEffect (onNext qs))
    (\err -> unsafePerformEffect (onError err))
    (\_ -> unsafePerformEffect (onComplete unit))

foreign import isQuerySnapshotEmptyImp :: Fn1 QuerySnapshot (Effect Boolean)

isQuerySnapshotEmpty :: QuerySnapshot -> (Effect Boolean)
isQuerySnapshotEmpty = runFn1 isQuerySnapshotEmptyImp

foreign import setDocImp :: forall a. Fn2 DocumentReference a (Effect (Promise Unit))

setDoc :: forall a. DocumentReference -> a -> Aff Unit
setDoc = runFn2 setDocImp ..> toAffE

foreign import addDocImp :: forall a. Fn2 CollectionReference a (Effect (Promise Unit))

addDoc :: forall a. CollectionReference -> a -> Aff Unit
addDoc = runFn2 addDocImp ..> toAffE
