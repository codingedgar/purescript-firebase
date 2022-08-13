// @ts-check
const { initializeApp, getApp } = require("firebase/app");

exports.initializeAppImp = function (config) {
  return function () {
    return initializeApp(config);
  }
}

/**
 * 
 * @param {String} name
 * @returns {() => import("firebase/app").FirebaseApp}
 */
 exports.getAppImp = function (name) {
  return function () {
    return getApp(name);
  }
}

/**
 * 
 * @returns {import("firebase/app").FirebaseApp}
 */
exports.getApp2Imp = function () {
    return getApp();
}
