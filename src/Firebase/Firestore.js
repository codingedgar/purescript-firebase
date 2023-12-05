import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";

/**
 * 
 * @returns { import("firebase/firestore").Firestore } 
 */
export function getFirestoreImp() {
  return getFirestore();
}

/**
 * 
 * @param {String} path 
 * @param {import("firebase/firestore").Firestore} firestore 
 * @returns {() => import("firebase/firestore").CollectionReference}
 */
export function collectionImp(path, firestore) {
  return function () {
    return collection(firestore, path);
  }
}

/**
 * 
 * @param {String} path 
 * @param {import("firebase/firestore").WhereFilterOp} opStr
 * @param {unknown} value
 * @returns {() => import("firebase/firestore").QueryConstraint}
 */
export function whereImp(path, opStr, value) {
  return function () {
    return where(path, opStr, value);
  }
}

/**
 * 
 * @param {import("firebase/firestore").QueryConstraint[]} queryConstraints
 * @param {import("firebase/firestore").Query} q
 * @returns {() => import("firebase/firestore").Query}
 */
export function queryImp(queryConstraints, q) {
  return function () {
    return query(q, ...queryConstraints);
  }
}

/**
 * 
 * @param {import("firebase/firestore").Query} q
 * @returns {() => Promise<import("firebase/firestore").QuerySnapshot>}
 */
export function getDocsImp(q) {
  return function () {
    return getDocs(q);
  }
}

/**
 * 
 * @param {(result: import("firebase/firestore").QueryDocumentSnapshot) => () => void} callback
 * @param {import("firebase/firestore").QuerySnapshot} snapshot
 * @returns {() => void}
 */
export function foreachImp(callback, snapshot) {
  return function () {
    return snapshot.forEach(result => {
      callback(result)()
    })
  }
}

/**
 * 
 * @param {import("firebase/firestore").QuerySnapshot} snapshot
 * @returns {() => import("firebase/firestore").QueryDocumentSnapshot[]}
 */
export function getSnapshotDocsImp(snapshot) {
  return function () {
    return snapshot.docs
  }
}

/**
 * 
 * @param {import("firebase/firestore").DocumentSnapshot<import("firebase/firestore").DocumentData>} snapshot
 * @returns {() => import("firebase/firestore").DocumentData | undefined }
 */
export function getDocSnapshotDataImp(snapshot) {
  return function () {
    // TODO: map options
    return snapshot.data()
  }
}

/**
 * 
 * @param {import("firebase/firestore").QueryDocumentSnapshot} snapshot
 * @returns {() => import("firebase/firestore").DocumentData}
 */
export function getSnapshotDataImp(snapshot) {
  return function () {
    return snapshot.data()
  }
}

/**
 * 
 * @param {import("firebase/firestore").Firestore} firestore 
 * @param {String} path
 * @param {String[]} pathSegments
 * @returns {() => import("firebase/firestore").DocumentReference}
 */
export function docImp(firestore, path, pathSegments) {
  return function () {
    return doc(firestore, path, ...pathSegments)
  }
}

/**
 * 
 * @param {import("firebase/firestore").DocumentReference} doc 
 * @returns {() => Promise<void>}
 */
export function deleteImp(doc) {
  return function () {
    return deleteDoc(doc)
  }
}

/**
 * 
 * @param {(snapshot: import("firebase/firestore").QuerySnapshot) => void} onNext 
 * @param {(error: import("firebase/firestore").FirestoreError) => void} onError
 * @param {() => void} onCompletion
 * @param {import("firebase/firestore").Query} query
 * @returns {() => () => void}
 */
export function onSnapshotImp(onNext, onError, onCompletion, query) {
  return function () {
    // TODO: map other signature variations
    return onSnapshot(query, onNext, onError, onCompletion)
  }
}

/**
 * 
 * @param {import("firebase/firestore").DocumentReference<import("firebase/firestore").DocumentData>} doc 
 * @param {(snapshot: import("firebase/firestore").DocumentSnapshot) => void} onNext 
 * @param {(error: import("firebase/firestore").FirestoreError) => void} onError
 * @param {() => void} onCompletion
 * @returns {() => () => void}
 */
export function onDocSnapshotImp(doc, onNext, onError, onCompletion) {
  return function () {
    // TODO: map other signature variations
    return onSnapshot(doc, onNext, onError, onCompletion)
  }
}

/**
 * 
 * @param {import("firebase/firestore").QuerySnapshot} qs
 * @returns {() => Boolean}
 */
export function isQuerySnapshotEmptyImp(qs) {
  return function () {
    return qs.empty
  }
}

/**
 * 
 * @param {import("firebase/firestore").DocumentReference<import("firebase/firestore").DocumentData>} doc 
 * @param {import("firebase/firestore").DocumentData} data
 * @returns {() => Promise<void>}
 */
export function setDocImp(doc, data) {
  return function () {
    return setDoc(doc, data)
  }
}

/**
 * 
 * @param {import("firebase/firestore").CollectionReference<import("firebase/firestore").DocumentData>} collection 
 * @param {import("firebase/firestore").DocumentData} data
 * @returns {() => Promise<import("firebase/firestore").DocumentReference<import("firebase/firestore").DocumentData>>}
 */
export function addDocImp(collection, data) {
  return function () {
    return addDoc(collection, data)
  }
}
