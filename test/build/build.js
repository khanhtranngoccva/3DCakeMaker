/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/3dText.js":
/*!***********************!*\
  !*** ./src/3dText.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderCandles\": () => (/* binding */ renderCandles)\n/* harmony export */ });\nfunction apply3DText(parent) {\r\n    let text = parent.getAttribute(\"text\");\r\n    const firstTextElement = document.createElement(\"p\");\r\n    firstTextElement.classList.add(\"front3DText\");\r\n    firstTextElement.innerText = text;\r\n    parent.append(firstTextElement);\r\n    for (let i = 1; i < 20; i++) {\r\n        const textElement = document.createElement(\"p\");\r\n        textElement.classList.add(\"side3DText\");\r\n        textElement.innerText = text;\r\n        textElement.style.transform = `translateZ(${-i}px)`;\r\n        parent.append(textElement);\r\n    }\r\n}\r\n\r\nfunction applyCandleText(parent) {\r\n    parent.innerHTML = \"\";\r\n    let text = parent.getAttribute(\"text\");\r\n    for (let char of text) {\r\n        const outerTextElement = document.createElement(\"div\");\r\n        outerTextElement.classList.add(\"candleChar\");\r\n        parent.append(outerTextElement);\r\n        const frontTextElement = document.createElement(\"div\");\r\n        frontTextElement.innerText = char;\r\n        frontTextElement.classList.add(\"frontCandleChar\");\r\n        if (\"108\".includes(char)) {\r\n            frontTextElement.style.transform = \"scaleX(1.4)\";\r\n        }\r\n        outerTextElement.append(frontTextElement);\r\n\r\n        for (let i = 1; i < 20; i++) {\r\n            const textElement = document.createElement(\"div\");\r\n            textElement.classList.add(\"sideCandleChar\");\r\n            textElement.innerText = char;\r\n            textElement.style.transform = `translateZ(${-i}px)`;\r\n            frontTextElement.append(textElement);\r\n        }\r\n        const fire = `<div class=\"flame\">\r\n            <div class=\"flameTransformGroup\">\r\n                <div class=\"flamePart1 reusableBox\"></div>\r\n                <div class=\"flamePart2 reusableBox\"></div>\r\n                <div class=\"flamePeak reusableBox\"></div>    \r\n            </div>\r\n        </div>`\r\n        outerTextElement.innerHTML += fire;\r\n    }\r\n}\r\n\r\nfunction renderCandles() {\r\n    Array.from(document.querySelectorAll(\".candleText\")).map(e => applyCandleText(e));\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/3dText.js?");

/***/ }),

/***/ "./src/DimensionCSS.js":
/*!*****************************!*\
  !*** ./src/DimensionCSS.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"state\": () => (/* binding */ state),\n/* harmony export */   \"toggleParallax\": () => (/* binding */ toggleParallax)\n/* harmony export */ });\n// DimensionCSS state objects. One is abstracted away from the user.\r\nconst internalState = {\r\n    parallax: 0,\r\n    innerHeight: window.innerHeight,\r\n    innerWidth: window.innerWidth,\r\n    minRotX: -60,\r\n    maxRotX: 60,\r\n    minRotY: -180,\r\n    maxRotY: 180,\r\n}\r\nconst state = {};\r\n\r\n// Code for the reusable box\r\nfunction reusableBox() {\r\n    const reusableBoxContents = `<div class=\"_reusableBox__boxFace _reusableBox__boxBack _lighting\"></div>\r\n                <div class=\"_reusableBox__boxFace _reusableBox__boxFront _lighting\"></div>\r\n                <div class=\"_reusableBox__boxFace _reusableBox__boxLeft _lighting\"></div>\r\n                <div class=\"_reusableBox__boxFace _reusableBox__boxRight _lighting\"></div>\r\n                <div class=\"_reusableBox__boxFace _reusableBox__boxBottom _lighting\"></div>\r\n                <div class=\"_reusableBox__boxFace _reusableBox__boxTop _lighting\"></div>`;\r\n    Array.from(document.querySelectorAll(\".reusableBox\")).forEach(e => e.innerHTML || (e.innerHTML = reusableBoxContents));\r\n}\r\n\r\n// Code for the donut.\r\nfunction donut() {\r\n    const cylinderInDonutCount = 21;\r\n    const baseCylinderAngle = 2 * Math.PI / cylinderInDonutCount;\r\n    const reusableDonutContents = `<div class=\"reusableCylinder\"></div>`.repeat(cylinderInDonutCount);\r\n    Array.from(document.querySelectorAll(\".reusableDonut\")).forEach(e => {\r\n        e.innerHTML = reusableDonutContents;\r\n        Array.from(e.querySelectorAll(\".reusableCylinder\")).forEach((cylinderStrip, cylinderStripNumber) => {\r\n            cylinderStrip.style.transform = `rotateY(${cylinderStripNumber / cylinderInDonutCount}turn) translateZ(calc(var(--donutRadius) - var(--thickness) / 2)) rotateY(90deg) rotateX(90deg)`;\r\n            cylinderStrip.style.setProperty(\"--height\", `calc(var(--donutRadius) * ${2 * Math.tan(baseCylinderAngle / 2)})`);\r\n        });\r\n    });\r\n}\r\n\r\n// Code for the cylinder.\r\nfunction cylinder() {\r\n    const cylinderStripCount = 21;\r\n    const reusableCylinderContents = `<div class=\"_reusableCylinder__cylinderFace _reusableCylinder__cylinderTop _lighting\"></div>` + `<div class=\"_reusableCylinder__cylinderFace _reusableCylinder__cylinderStrip _lighting\"></div>`.repeat(cylinderStripCount) + `<div class=\"_reusableCylinder__cylinderFace _reusableCylinder__cylinderBottom _lighting\"></div>`;\r\n    const baseStripAngle = 2 * Math.PI / cylinderStripCount;\r\n    const thickCylinderContents = `<div class=\"reusableCylinder\"></div><div class=\"reusableCylinder reusableCylinderInner\"></div>`\r\n\r\n    Array.from(document.querySelectorAll(\".reusableThickCylinder\")).forEach(e => e.innerHTML || (e.innerHTML = thickCylinderContents));\r\n    Array.from(document.querySelectorAll(\".reusableCylinder\")).forEach(e => {\r\n        e.innerHTML || (e.innerHTML = reusableCylinderContents);\r\n        Array.from(e.querySelectorAll(\"._reusableCylinder__cylinderStrip\")).forEach((cylinderStrip, cylinderStripNumber) => {\r\n            cylinderStrip.style.transform = `rotateY(${cylinderStripNumber / cylinderStripCount}turn) translateZ(var(--radius))`;\r\n            cylinderStrip.style.setProperty(\"--width\", `calc(1px + var(--radius) * ${2 * Math.tan(baseStripAngle / 2)})`);\r\n        });\r\n    });\r\n}\r\n\r\n// Code for the parallax camera.\r\nfunction activateCamera() {\r\n    const camera = document.querySelector(\".globalCamera\");\r\n\r\n    Object.defineProperty(state, \"parallax\", {\r\n        get() {\r\n            return internalState.parallax;\r\n        },\r\n        set(data) {\r\n            if (data) {\r\n                internalState.parallax = true;\r\n            }\r\n            else {\r\n                internalState.parallax = false;\r\n                camera.style.removeProperty(\"transform\");\r\n            }\r\n            return internalState.parallax;\r\n        }\r\n    });\r\n\r\n    const CONSTRAINT_KEYWORDS = [\"minRotX\", \"maxRotX\", \"minRotY\", \"maxRotY\"];\r\n    for (let keyword of CONSTRAINT_KEYWORDS) {\r\n        Object.defineProperty(state, keyword, {\r\n            get() {\r\n                return internalState[keyword];\r\n            },\r\n            set(data) {\r\n                if (typeof data !== \"number\" || isNaN(data)) {\r\n                    throw new Error(\"Minimum and maximum must be a number\");\r\n                }\r\n                internalState[keyword] = data;\r\n            }\r\n        })\r\n    }\r\n\r\n    window.addEventListener(\"mousemove\", function (e) {\r\n        if (state.parallax) {\r\n            const {minRotX, maxRotX, minRotY, maxRotY} = internalState;\r\n            const {clientX, clientY} = e;\r\n            const percentageX = clientX / internalState.innerWidth;\r\n            const percentageY = clientY / internalState.innerHeight;\r\n            const rotX = -(minRotX + (maxRotX - minRotX) * percentageY);\r\n            const rotY = minRotY + (maxRotY - minRotY) * percentageX;\r\n            requestAnimationFrame(() => {\r\n                requestAnimationFrame(() => {\r\n                    camera.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;\r\n                })\r\n            });\r\n        }\r\n    });\r\n\r\n    window.addEventListener(\"resize\", function() {\r\n        internalState.innerWidth = window.innerWidth;\r\n        internalState.innerHeight = window.innerHeight;\r\n    });\r\n}\r\n\r\nfunction toggleParallax() {\r\n    state.parallax = !state.parallax;\r\n}\r\n\r\nactivateCamera();\r\n\r\nfunction render() {\r\n    reusableBox();\r\n    donut();\r\n    cylinder();\r\n}\r\n\r\nconsole.log(\"%cDimensionCSS loaded.\", \"color:blue;font-weight:500\")\r\n\n\n//# sourceURL=webpack:///./src/DimensionCSS.js?");

/***/ }),

/***/ "./src/cakeSetup.js":
/*!**************************!*\
  !*** ./src/cakeSetup.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _3dText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3dText */ \"./src/3dText.js\");\n/* harmony import */ var _DimensionCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DimensionCSS */ \"./src/DimensionCSS.js\");\n\r\n\r\n_DimensionCSS__WEBPACK_IMPORTED_MODULE_1__.toggleParallax();\r\n\r\nlet specialKeywords = {\r\n    rainbow: `linear-gradient(\r\n        rgba(255, 0, 0, 1) 10%,\r\n        rgba(255, 154, 0, 1) 20%,\r\n        rgba(208, 222, 33, 1) 30%,\r\n        rgba(79, 220, 74, 1) 40%,\r\n        rgba(63, 218, 216, 1) 50%,\r\n        rgba(47, 201, 226, 1) 60%,\r\n        rgba(28, 127, 238, 1) 70%,\r\n        rgba(95, 21, 242, 1) 80%,\r\n        rgba(186, 12, 248, 1) 90%)`\r\n}\r\n\r\nlet currentCakeSetup = {\r\n    candleFlameColor: \"#fd6\",\r\n    candleColor: \"pink\",\r\n    cakeBaseColor: \"#269d26\",\r\n    cakeBaseCreamColor: \"#ffffff\",\r\n    cakeCreamColor: \"#7cda9a\",\r\n    recipientAge: 27,\r\n    cakeTopping: \"creamCherry\",\r\n};\r\n\r\nlet toppingToClass = {\r\n    flakes: \".flakeTopping\",\r\n    creamCherry: \".creamCherryTopping\",\r\n    berry: \".berryTopping\",\r\n};\r\n\r\nfunction renderCake() {\r\n    (0,_3dText__WEBPACK_IMPORTED_MODULE_0__.renderCandles)();\r\n    Array.from(document.querySelectorAll(\".flame\")).map(\r\n        flame => flame.style.setProperty(\"--mainColor\", currentCakeSetup.candleFlameColor));\r\n    Array.from(document.querySelectorAll(\".candleChar\")).map(\r\n        candle => candle.style.setProperty(\"--candleColor\", currentCakeSetup.candleColor));\r\n    Array.from(document.querySelectorAll(\".cakeBase\")).map(\r\n        base => base.style.setProperty(\"--baseColor\", currentCakeSetup.cakeBaseColor));\r\n    Array.from(document.querySelectorAll(\".cakeBase\")).map(\r\n        base => base.style.setProperty(\"--baseCreamColor\", currentCakeSetup.cakeBaseCreamColor));\r\n    Array.from(document.querySelectorAll(\".cakeIcing\")).map(\r\n        base => base.style.setProperty(\"--topCreamColor\", currentCakeSetup.cakeCreamColor));\r\n    Array.from(document.querySelectorAll(\".creamBase\")).map(\r\n        base => base.style.setProperty(\"--primaryColor\", currentCakeSetup.cakeCreamColor));\r\n    Array.from(document.querySelectorAll(\".cakeTopping\")).map(\r\n        topping => topping.style.display = \"none\");\r\n    Array.from(document.querySelectorAll(toppingToClass[currentCakeSetup.cakeTopping])).map(\r\n        topping => topping.style.display = \"block\");\r\n    Array.from(document.querySelectorAll(\".candleText\")).map(\r\n        text => text.setAttribute(\"text\", currentCakeSetup.recipientAge));\r\n    _DimensionCSS__WEBPACK_IMPORTED_MODULE_1__.render();\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderCake);\n\n//# sourceURL=webpack:///./src/cakeSetup.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cakeSetup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cakeSetup.js */ \"./src/cakeSetup.js\");\n\r\n\r\n(0,_cakeSetup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;