/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/events.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/chat.js":
/*!************************!*\
  !*** ./client/chat.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _secondary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./secondary */ \"./client/secondary.js\");\n/*jshint esversion: 6 */\r\n\r\n\r\n\r\n\r\nlet socket = io({\r\n    autoConnect: true\r\n});\r\n\r\nconst ml = document.querySelector('#messages');\r\n\r\nsocket.on('chat message', (user, msg) => {\r\n    ml.appendChild(Object(_secondary__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(user, msg));\r\n});\r\n\r\nsocket.on('self-message',(user,msg) => {\r\n    let li = Object(_secondary__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(user,msg,true);\r\n    li.classList.add('self');\r\n    ml.appendChild(li);\r\n})\r\n\r\nsocket.on('chat history', (msgs) => {\r\n    for(let i in msgs){\r\n        ml.appendChild(Object(_secondary__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(msgs[i][0],msgs[i][1]));\r\n    }\r\n});\r\n\r\nsocket.on('notification', (user, msg) => {\r\n    ml.appendChild(Object(_secondary__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(user,msg));\r\n})\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (socket);\n\n//# sourceURL=webpack:///./client/chat.js?");

/***/ }),

/***/ "./client/events.js":
/*!**************************!*\
  !*** ./client/events.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat */ \"./client/chat.js\");\n/*jshint esversion: 6 */\r\n\r\n\r\n\r\ndocument.querySelector('#button').onclick = () => {\r\n    _chat__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('chat message', document.querySelector('#message').value);\r\n    document.querySelector('#message').value = \"\";\r\n};\r\n\r\ndocument.querySelector('#logInButton').onclick = () => {\r\n    _chat__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('logIn',document.querySelector('#login').value,document.querySelector('#password').value);\r\n    document.querySelector('#password').value = \"\";\r\n    document.querySelector('#login').value = \"\";\r\n};\r\n\r\ndocument.querySelector('#registerButton').onclick = () => {\r\n    _chat__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('register', document.querySelector('#login').value, document.querySelector('#password').value);\r\n    document.querySelector('#password').value = \"\";\r\n    document.querySelector('#login').value = \"\";\r\n};\n\n//# sourceURL=webpack:///./client/events.js?");

/***/ }),

/***/ "./client/secondary.js":
/*!*****************************!*\
  !*** ./client/secondary.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*jshint esversion: 6 */\r\n\r\nconst createMsg = (user, msg, self) => {\r\n    let li = document.createElement('li');\r\n    li.innerText = ((!self)?((user.username !== \"guest\") ? user.username + ': ' : 'guest#' + user.id + ': '):'')  + msg;\r\n    li.style.backgroundColor = user.color;\r\n    return li;\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMsg);\n\n//# sourceURL=webpack:///./client/secondary.js?");

/***/ })

/******/ });