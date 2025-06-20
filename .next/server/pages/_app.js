/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/AuthContext.tsx":
/*!**********************************!*\
  !*** ./contexts/AuthContext.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/firebase-client */ \"./lib/firebase-client.ts\");\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!context) {\n        throw new Error(\"useAuth must be used within an AuthProvider\");\n    }\n    return context;\n};\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth) return;\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth, (user)=>{\n            setUser(user);\n            setLoading(false);\n        });\n        return unsubscribe;\n    }, []);\n    const signInWithEmail = async (email, password)=>{\n        if (!_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth) throw new Error(\"Auth not initialized\");\n        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth, email, password);\n    };\n    const signUpWithEmail = async (email, password)=>{\n        if (!_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth) throw new Error(\"Auth not initialized\");\n        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth, email, password);\n    };\n    const signInWithGoogle = async ()=>{\n        if (!_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth) throw new Error(\"Auth not initialized\");\n        const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthProvider();\n        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth, provider);\n    };\n    const logout = async ()=>{\n        if (!_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth) throw new Error(\"Auth not initialized\");\n        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth);\n    };\n    const resetPassword = async (email)=>{\n        if (!_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth) throw new Error(\"Auth not initialized\");\n        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.sendPasswordResetEmail)(_lib_firebase_client__WEBPACK_IMPORTED_MODULE_3__.auth, email);\n    };\n    const value = {\n        user,\n        loading,\n        signInWithEmail,\n        signUpWithEmail,\n        signInWithGoogle,\n        logout,\n        resetPassword\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/m.hirosaka/03_private/character/contexts/AuthContext.tsx\",\n        lineNumber: 86,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9BdXRoQ29udGV4dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUE4RTtBQVV2RDtBQUN1QjtBQVk5QyxNQUFNYSw0QkFBY1osb0RBQWFBLENBQWtCLENBQUM7QUFFN0MsTUFBTWEsVUFBVTtJQUNyQixNQUFNQyxVQUFVYixpREFBVUEsQ0FBQ1c7SUFDM0IsSUFBSSxDQUFDRSxTQUFTO1FBQ1osTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCxFQUFFO0FBRUssTUFBTUUsZUFBd0QsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDaEYsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdqQiwrQ0FBUUEsQ0FBYztJQUM5QyxNQUFNLENBQUNrQixTQUFTQyxXQUFXLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUV2Q0MsZ0RBQVNBLENBQUM7UUFDUixJQUFJLENBQUNRLHNEQUFJQSxFQUFFO1FBRVgsTUFBTVcsY0FBY2YsaUVBQWtCQSxDQUFDSSxzREFBSUEsRUFBRSxDQUFDTztZQUM1Q0MsUUFBUUQ7WUFDUkcsV0FBVztRQUNiO1FBRUEsT0FBT0M7SUFDVCxHQUFHLEVBQUU7SUFFTCxNQUFNQyxrQkFBa0IsT0FBT0MsT0FBZUM7UUFDNUMsSUFBSSxDQUFDZCxzREFBSUEsRUFBRSxNQUFNLElBQUlJLE1BQU07UUFDM0IsTUFBTVgseUVBQTBCQSxDQUFDTyxzREFBSUEsRUFBRWEsT0FBT0M7SUFDaEQ7SUFFQSxNQUFNQyxrQkFBa0IsT0FBT0YsT0FBZUM7UUFDNUMsSUFBSSxDQUFDZCxzREFBSUEsRUFBRSxNQUFNLElBQUlJLE1BQU07UUFDM0IsTUFBTVYsNkVBQThCQSxDQUFDTSxzREFBSUEsRUFBRWEsT0FBT0M7SUFDcEQ7SUFFQSxNQUFNRSxtQkFBbUI7UUFDdkIsSUFBSSxDQUFDaEIsc0RBQUlBLEVBQUUsTUFBTSxJQUFJSSxNQUFNO1FBQzNCLE1BQU1hLFdBQVcsSUFBSXBCLDZEQUFrQkE7UUFDdkMsTUFBTUMsOERBQWVBLENBQUNFLHNEQUFJQSxFQUFFaUI7SUFDOUI7SUFFQSxNQUFNQyxTQUFTO1FBQ2IsSUFBSSxDQUFDbEIsc0RBQUlBLEVBQUUsTUFBTSxJQUFJSSxNQUFNO1FBQzNCLE1BQU1ULHNEQUFPQSxDQUFDSyxzREFBSUE7SUFDcEI7SUFFQSxNQUFNbUIsZ0JBQWdCLE9BQU9OO1FBQzNCLElBQUksQ0FBQ2Isc0RBQUlBLEVBQUUsTUFBTSxJQUFJSSxNQUFNO1FBQzNCLE1BQU1MLHFFQUFzQkEsQ0FBQ0Msc0RBQUlBLEVBQUVhO0lBQ3JDO0lBRUEsTUFBTU8sUUFBUTtRQUNaYjtRQUNBRTtRQUNBRztRQUNBRztRQUNBQztRQUNBRTtRQUNBQztJQUNGO0lBRUEscUJBQ0UsOERBQUNsQixZQUFZb0IsUUFBUTtRQUFDRCxPQUFPQTtrQkFDMUJkOzs7Ozs7QUFHUCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29jLWNoYXJhY3Rlci1zaGVldC8uL2NvbnRleHRzL0F1dGhDb250ZXh0LnRzeD82ZDgxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFVzZXIsXG4gIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkLFxuICBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQsXG4gIHNpZ25PdXQsXG4gIG9uQXV0aFN0YXRlQ2hhbmdlZCxcbiAgR29vZ2xlQXV0aFByb3ZpZGVyLFxuICBzaWduSW5XaXRoUG9wdXAsXG4gIHNlbmRQYXNzd29yZFJlc2V0RW1haWxcbn0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlLWNsaWVudCc7XG5cbmludGVyZmFjZSBBdXRoQ29udGV4dFR5cGUge1xuICB1c2VyOiBVc2VyIHwgbnVsbDtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgc2lnbkluV2l0aEVtYWlsOiAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgc2lnblVwV2l0aEVtYWlsOiAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgc2lnbkluV2l0aEdvb2dsZTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgbG9nb3V0OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZXNldFBhc3N3b3JkOiAoZW1haWw6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0PEF1dGhDb250ZXh0VHlwZT4oe30gYXMgQXV0aENvbnRleHRUeXBlKTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyJyk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQ7XG59O1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyOiBSZWFjdC5GQzx7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfT4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWF1dGgpIHJldHVybjtcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsICh1c2VyKSA9PiB7XG4gICAgICBzZXRVc2VyKHVzZXIpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzaWduSW5XaXRoRW1haWwgPSBhc3luYyAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghYXV0aCkgdGhyb3cgbmV3IEVycm9yKCdBdXRoIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGF3YWl0IHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCk7XG4gIH07XG5cbiAgY29uc3Qgc2lnblVwV2l0aEVtYWlsID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIWF1dGgpIHRocm93IG5ldyBFcnJvcignQXV0aCBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICBhd2FpdCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKTtcbiAgfTtcblxuICBjb25zdCBzaWduSW5XaXRoR29vZ2xlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghYXV0aCkgdGhyb3cgbmV3IEVycm9yKCdBdXRoIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEdvb2dsZUF1dGhQcm92aWRlcigpO1xuICAgIGF3YWl0IHNpZ25JbldpdGhQb3B1cChhdXRoLCBwcm92aWRlcik7XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghYXV0aCkgdGhyb3cgbmV3IEVycm9yKCdBdXRoIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGF3YWl0IHNpZ25PdXQoYXV0aCk7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRQYXNzd29yZCA9IGFzeW5jIChlbWFpbDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFhdXRoKSB0aHJvdyBuZXcgRXJyb3IoJ0F1dGggbm90IGluaXRpYWxpemVkJyk7XG4gICAgYXdhaXQgc2VuZFBhc3N3b3JkUmVzZXRFbWFpbChhdXRoLCBlbWFpbCk7XG4gIH07XG5cbiAgY29uc3QgdmFsdWUgPSB7XG4gICAgdXNlcixcbiAgICBsb2FkaW5nLFxuICAgIHNpZ25JbldpdGhFbWFpbCxcbiAgICBzaWduVXBXaXRoRW1haWwsXG4gICAgc2lnbkluV2l0aEdvb2dsZSxcbiAgICBsb2dvdXQsXG4gICAgcmVzZXRQYXNzd29yZFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07Il0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkIiwiY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkIiwic2lnbk91dCIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsIkdvb2dsZUF1dGhQcm92aWRlciIsInNpZ25JbldpdGhQb3B1cCIsInNlbmRQYXNzd29yZFJlc2V0RW1haWwiLCJhdXRoIiwiQXV0aENvbnRleHQiLCJ1c2VBdXRoIiwiY29udGV4dCIsIkVycm9yIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidW5zdWJzY3JpYmUiLCJzaWduSW5XaXRoRW1haWwiLCJlbWFpbCIsInBhc3N3b3JkIiwic2lnblVwV2l0aEVtYWlsIiwic2lnbkluV2l0aEdvb2dsZSIsInByb3ZpZGVyIiwibG9nb3V0IiwicmVzZXRQYXNzd29yZCIsInZhbHVlIiwiUHJvdmlkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./lib/firebase-client.ts":
/*!********************************!*\
  !*** ./lib/firebase-client.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_2__);\n// Firebase Client SDK for browser\n\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyDtwR0-ZkF_FSV6ffDTBj7KAvihhR9S-8c\",\n    authDomain: \"hatake-ffb62.firebaseapp.com\",\n    projectId: \"hatake-ffb62\",\n    storageBucket: \"hatake-ffb62.firebasestorage.app\",\n    messagingSenderId: \"883954002398\",\n    appId: \"1:883954002398:web:91c3ae34dda9b94f5e154f\"\n};\nlet app;\nlet db;\nlet auth;\nif (false) {}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvZmlyZWJhc2UtY2xpZW50LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0NBQWtDO0FBQ3dCO0FBQ0c7QUFDZjtBQUU5QyxNQUFNRyxpQkFBaUI7SUFDckJDLFFBQVFDLHlDQUF3QztJQUNoREcsWUFBWUgsOEJBQTRDO0lBQ3hESyxXQUFXTCxjQUEyQztJQUN0RE8sZUFBZVAsa0NBQStDO0lBQzlEUyxtQkFBbUJULGNBQW9EO0lBQ3ZFVyxPQUFPWCwyQ0FBdUM7QUFDaEQ7QUFFQSxJQUFJYTtBQUNKLElBQUlDO0FBQ0osSUFBSUM7QUFFSixJQUFJLEtBQWtCLEVBQWEsRUFJbEM7QUFFbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2MtY2hhcmFjdGVyLXNoZWV0Ly4vbGliL2ZpcmViYXNlLWNsaWVudC50cz80NGYzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZpcmViYXNlIENsaWVudCBTREsgZm9yIGJyb3dzZXJcbmltcG9ydCB7IGluaXRpYWxpemVBcHAsIEZpcmViYXNlQXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IGdldEZpcmVzdG9yZSwgRmlyZXN0b3JlIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmltcG9ydCB7IGdldEF1dGgsIEF1dGggfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcblxuY29uc3QgZmlyZWJhc2VDb25maWcgPSB7XG4gIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBJX0tFWSxcbiAgYXV0aERvbWFpbjogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVVUSF9ET01BSU4sXG4gIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRCxcbiAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lELFxuICBhcHBJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lEXG59O1xuXG5sZXQgYXBwOiBGaXJlYmFzZUFwcCB8IHVuZGVmaW5lZDtcbmxldCBkYjogRmlyZXN0b3JlIHwgdW5kZWZpbmVkO1xubGV0IGF1dGg6IEF1dGggfCB1bmRlZmluZWQ7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbiAgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcbiAgYXV0aCA9IGdldEF1dGgoYXBwKTtcbn1cblxuZXhwb3J0IHsgZGIsIGF1dGggfTsiXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUFwcCIsImdldEZpcmVzdG9yZSIsImdldEF1dGgiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZIiwiYXV0aERvbWFpbiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOIiwicHJvamVjdElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRCIsInN0b3JhZ2VCdWNrZXQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCIsImFwcElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lEIiwiYXBwIiwiZGIiLCJhdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/firebase-client.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./contexts/AuthContext.tsx\");\n\n\n\n\nfunction App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Hot reload 無限ループ防止\n        const handleBeforeUnload = ()=>{\n            window.removeEventListener(\"beforeunload\", handleBeforeUnload);\n        };\n        window.addEventListener(\"beforeunload\", handleBeforeUnload);\n        return ()=>{\n            window.removeEventListener(\"beforeunload\", handleBeforeUnload);\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/m.hirosaka/03_private/character/pages/_app.tsx\",\n            lineNumber: 22,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/m.hirosaka/03_private/character/pages/_app.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDaUM7QUFDSDtBQUN3QjtBQUV2QyxTQUFTRSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVESixnREFBU0EsQ0FBQztRQUNSLHFCQUFxQjtRQUNyQixNQUFNSyxxQkFBcUI7WUFDekJDLE9BQU9DLG1CQUFtQixDQUFDLGdCQUFnQkY7UUFDN0M7UUFFQUMsT0FBT0UsZ0JBQWdCLENBQUMsZ0JBQWdCSDtRQUV4QyxPQUFPO1lBQ0xDLE9BQU9DLG1CQUFtQixDQUFDLGdCQUFnQkY7UUFDN0M7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0osK0RBQVlBO2tCQUNYLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29jLWNoYXJhY3Rlci1zaGVldC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJ1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHRzL0F1dGhDb250ZXh0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIEhvdCByZWxvYWQg54Sh6ZmQ44Or44O844OX6Ziy5q2iXG4gICAgY29uc3QgaGFuZGxlQmVmb3JlVW5sb2FkID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGhhbmRsZUJlZm9yZVVubG9hZCk7XG4gICAgfTtcbiAgICBcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlQmVmb3JlVW5sb2FkKTtcbiAgICBcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGhhbmRsZUJlZm9yZVVubG9hZCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEF1dGhQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0F1dGhQcm92aWRlcj5cbiAgKVxufSJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJBdXRoUHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJoYW5kbGVCZWZvcmVVbmxvYWQiLCJ3aW5kb3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/app");

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/auth");

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/firestore");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();