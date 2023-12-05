import { initializeApp, getApp } from "firebase/app";

export function initializeAppImp(config) {
  return function () {
    return initializeApp(config);
  }
}

/**
 * 
 * @param {String} name
 * @returns {() => import("firebase/app").FirebaseApp}
 */
export function getAppImp(name) {
  return function () {
    return getApp(name);
  }
}

/**
 * 
 * @returns {import("firebase/app").FirebaseApp}
 */
export function getApp2Imp() {
  return getApp();
}
