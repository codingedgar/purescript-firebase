// @ts-check
const {
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
} = require("firebase/firestore");

/**
 * 
 * @returns { import("firebase/firestore").Firestore } 
 */
exports.getFirestoreImp = function () {
  return getFirestore();
}

/**
 * 
 * @param {String} path 
 * @param {import("firebase/firestore").Firestore} firestore 
 * @returns {() => import("firebase/firestore").CollectionReference}
 */
exports.collectionImp = function (path, firestore) {
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
exports.whereImp = function (path, opStr, value) {
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
exports.queryImp = function (queryConstraints, q) {
  return function () {
    return query(q, ...queryConstraints);
  }
}

/**
 * 
 * @param {import("firebase/firestore").Query} q
 * @returns {() => Promise<import("firebase/firestore").QuerySnapshot>}
 */
exports.getDocsImp = function (q) {
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
exports.foreachImp = function (callback, snapshot) {
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
exports.getSnapshotDocsImp = function (snapshot) {
  return function () {
    return snapshot.docs
  }
}

/**
 * 
 * @param {import("firebase/firestore").DocumentSnapshot<import("firebase/firestore").DocumentData>} snapshot
 * @returns {() => import("firebase/firestore").DocumentData | undefined }
 */
exports.getDocSnapshotDataImp = function (snapshot) {
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
exports.getSnapshotDataImp = function (snapshot) {
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
exports.docImp = function (firestore, path, pathSegments) {
  return function () {
    return doc(firestore, path, ...pathSegments)
  }
}

/**
 * 
 * @param {import("firebase/firestore").DocumentReference} doc 
 * @returns {() => Promise<void>}
 */
exports.deleteImp = function (doc) {
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
exports.onSnapshotImp = function (onNext, onError, onCompletion, query) {
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
exports.onDocSnapshotImp = function (doc, onNext, onError, onCompletion) {
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
exports.isQuerySnapshotEmptyImp = function (qs) {
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
exports.setDocImp = function (doc, data) {
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
exports.addDocImp = function (collection, data) {
  return function () {
    return addDoc(collection, data)
  }
}
