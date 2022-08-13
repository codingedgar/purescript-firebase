// @ts-check
const {
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
  Firestore,
  WhereFilterOp,
  QueryConstraint,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  getFirestore,
  DocumentData,
  doc,
  deleteDoc,
  DocumentReference,
  onSnapshot,
  FirestoreError,
  DocumentSnapshot,
  setDoc,
  addDoc,
} = require("firebase/firestore");

/**
 * 
 * @returns { Firestore } 
 */
exports.getFirestoreImp = function () {
  return getFirestore();
}

/**
 * 
 * @param {String} path 
 * @param {Firestore} firestore 
 * @returns {() => CollectionReference}
 */
exports.collectionImp = function (path, firestore) {
  return function () {
    return collection(firestore, path);
  }
}

/**
 * 
 * @param {String} path 
 * @param {WhereFilterOp} opStr
 * @param {unknown} value
 * @returns {() => QueryConstraint}
 */
exports.whereImp = function (path, opStr, value) {
  return function () {
    return where(path, opStr, value);
  }
}

/**
 * 
 * @param {QueryConstraint[]} queryConstraints
 * @param {Query} q
 * @returns {() => Query}
 */
exports.queryImp = function (queryConstraints, q) {
  return function () {
    return query(q, ...queryConstraints);
  }
}

/**
 * 
 * @param {Query} q
 * @returns {() => Promise<QuerySnapshot>}
 */
exports.getDocsImp = function (q) {
  return function () {
    return getDocs(q);
  }
}

/**
 * 
 * @param {(result: QueryDocumentSnapshot) => () => void} callback
 * @param {QuerySnapshot} snapshot
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
 * @param {QuerySnapshot} snapshot
 * @returns {() => QueryDocumentSnapshot[]}
 */
exports.getSnapshotDocsImp = function (snapshot) {
  return function () {
    return snapshot.docs
  }
}

/**
 * 
 * @param {DocumentSnapshot<DocumentData>} snapshot
 * @returns {() => DocumentData | undefined }
 */
exports.getDocSnapshotDataImp = function (snapshot) {
  return function () {
    // TODO: map options
    return snapshot.data()
  }
}

/**
 * 
 * @param {QueryDocumentSnapshot} snapshot
 * @returns {() => DocumentData}
 */
exports.getSnapshotDataImp = function (snapshot) {
  return function () {
    return snapshot.data()
  }
}

/**
 * 
 * @param {Firestore} firestore 
 * @param {String} path
 * @param {String[]} pathSegments
 * @returns {() => DocumentReference}
 */
exports.docImp = function (firestore, path, pathSegments) {
  return function () {
    return doc(firestore, path, ...pathSegments)
  }
}

/**
 * 
 * @param {DocumentReference} doc 
 * @returns {() => Promise<void>}
 */
exports.deleteImp = function (doc) {
  return function () {
    return deleteDoc(doc)
  }
}

/**
 * 
 * @param {(snapshot: QuerySnapshot) => void} onNext 
 * @param {(error: FirestoreError) => void} onError
 * @param {() => void} onCompletion
 * @param {Query} query
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
 * @param {DocumentReference<DocumentData>} doc 
 * @param {(snapshot: DocumentSnapshot) => void} onNext 
 * @param {(error: FirestoreError) => void} onError
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
 * @param {QuerySnapshot} qs
 * @returns {() => Boolean}
 */
exports.isQuerySnapshotEmptyImp = function (qs) {
  return function () {
    return qs.empty
  }
}

/**
 * 
 * @param {DocumentReference<DocumentData>} doc 
 * @param {DocumentData} data
 * @returns {() => Promise<void>}
 */
exports.setDocImp = function (doc, data) {
  return function () {
    return setDoc(doc, data)
  }
}

/**
 * 
 * @param {CollectionReference<DocumentData>} collection 
 * @param {DocumentData} data
 * @returns {() => Promise<DocumentReference<DocumentData>>}
 */
exports.addDocImp = function (collection, data) {
  return function () {
    return addDoc(collection, data)
  }
}
