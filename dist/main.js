/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./calculator-error-view.js":
/*!**********************************!*\
  !*** ./calculator-error-view.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var errorNode = function errorNode() {
  var errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');
  errorContainer.innerHTML = "\n    <div class=\"error__icon\"></div>\n    <h4 class=\"error__title\">\u041E\u0448\u0438\u0431\u043A\u0430</h4>\n    <p class=\"error__text\">\u0432\u044B \u0441\u0434\u0435\u043B\u0430\u043B\u0438 \u043E\u0434\u043D\u0443 \u0438\u0437 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0445 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439</p>\n    <ul class=\"error__list\">\n      <li>\u041F\u043E\u0434\u0435\u043B\u0438\u043B\u0438 \u0447\u0438\u0441\u043B\u043E \u043D\u0430 \u043D\u043E\u043B\u044C</li>\n      <li>\u041F\u043E\u0434\u0435\u043B\u0438\u043B\u0438 \u043D\u043E\u043B\u044C \u043D\u0430 \u043D\u043E\u043B\u044C</li>\n      <li>\u041F\u043E\u043F\u044B\u0442\u0430\u043B\u0430\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0440\u0435\u043D\u044C \u0438\u0437 \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0447\u0438\u0441\u043B\u0430</li>\n    </ul>\n    \n    <button class=\"error__btn\">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</button>\n  ";
  return errorContainer;
};

/* harmony default export */ __webpack_exports__["default"] = (errorNode);

/***/ }),

/***/ "./calculator-logic.js":
/*!*****************************!*\
  !*** ./calculator-logic.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator(previousOperandTextElement, currentOperandTextElement) {
    _classCallCheck(this, Calculator);

    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.currentOperand = '0'; // показывает большое число на экране в данный момент

      this.previousOperand = '';
      this.operation = undefined;
      this.equals = false; // флаг для знака равно
    }
  }, {
    key: "delete",
    value: function _delete() {
      if (this.currentOperand === '0') return;
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      if (this.currentOperand === '') this.currentOperand = '0';
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (this.equals) {
        this.currentOperand = '0';
        this.equals = false;
      }

      if (number === '.' && this.currentOperand.includes('.') || number === '0' && (this.currentOperand === '0' || this.currentOperand === '-')) return; // позволяет поставить только одну точку в числе
      // if (number === '0' && this.currentOperand === '0') return; //позволяет не наставить вначале кучу нулей

      if (this.currentOperand === '0' && /[1-9]/.test(number)) this.currentOperand = ''; // если у нас число состоит только из 0 то делаем сброс

      if (this.currentOperand === '-' && number === '.') this.currentOperand = '-0';
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }, {
    key: "choseOperation",
    value: function choseOperation(operation) {
      if (this.equals) this.equals = false;
      if (this.currentOperand === '0' && operation !== '-') return; // если число не нажали, то он ничего делать не будет

      if (this.currentOperand === '0' && operation === '-') {
        // если мы нажали сразу минус, то этот минус относится к числу
        this.currentOperand = operation;
        return;
      }

      if (this.previousOperand !== '') {
        this.compute();
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '0';
    }
  }, {
    key: "compute",
    value: function compute() {
      var isEquals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var computation;
      var prev = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (Number.isNaN(prev) || Number.isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;

        case '-':
          computation = prev - current;
          break;

        case '*':
          computation = prev * current;
          break;

        case '*/*':
          computation = prev / current;
          break;

        case '^':
          computation = Math.pow(prev, current); // степень 0.5 нужно отловить ошибку на этот момент

          break;

        default:
          return;
      }

      this.currentOperand = +computation.toFixed(10); // отредактировать это место на вычисления

      if (Number.isNaN(this.currentOperand)) {
        this.currentOperand = false;
      }

      this.operation = undefined;
      this.previousOperand = '';
      this.equals = isEquals;
    }
  }, {
    key: "sqrtOperation",
    value: function sqrtOperation() {
      var current = parseFloat(this.currentOperand);
      if (Number.isNaN(current)) return;
      this.currentOperand = Math.sqrt(current);

      if (Number.isNaN(this.currentOperand)) {
        this.currentOperand = false;
      }
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      if (this.currentOperand === false || this.currentOperand === Infinity) {
        this.currentOperandTextElement.innerText = '';
        this.previousOperandTextElement.innerText = '0';
        this.equals = true;
        this.currentOperand = '0';
        return true;
      } // нужно обработать поведение с плавующей запятой


      this.currentOperandTextElement.innerText = this.currentOperand;

      if (this.operation != null) {
        this.previousOperandTextElement.innerText = "".concat(this.previousOperand, " ").concat(this.operation);
      } else {
        this.previousOperandTextElement.innerText = this.previousOperand;
      }

      return;
    }
  }]);

  return Calculator;
}();

/* harmony default export */ __webpack_exports__["default"] = (Calculator);

/***/ }),

/***/ "./calculator-object.js":
/*!******************************!*\
  !*** ./calculator-object.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var objCalculator = [// нужно будет клавиши коды для всех подправить
{
  action: ['data-action', 'allClear'],
  textElement: 'AC',
  key: ['data_key', 'Delete']
}, {
  action: ['data-action', 'delete'],
  textElement: 'DEL',
  key: ['data_key', 'Backspace']
}, {
  action: ['data-action', 'operation'],
  textElement: '^',
  key: ['data_key', 'Digit6']
}, {
  action: ['data-action', 'operation'],
  textElement: '*/*',
  key: ['data_key', 'NumpadDivide']
}, {
  action: ['data-action', 'number'],
  textElement: '1',
  key: ['data_key', 'Numpad1']
}, {
  action: ['data-action', 'number'],
  textElement: '2',
  key: ['data_key', 'Numpad2']
}, {
  action: ['data-action', 'number'],
  textElement: '3',
  key: ['data_key', 'Numpad3']
}, {
  action: ['data-action', 'operation'],
  textElement: '*',
  key: ['data_key', 'NumpadMultiply']
}, {
  action: ['data-action', 'number'],
  textElement: '4',
  key: ['data_key', 'Numpad4']
}, {
  action: ['data-action', 'number'],
  textElement: '5',
  key: ['data_key', 'Numpad5']
}, {
  action: ['data-action', 'number'],
  textElement: '6',
  key: ['data_key', 'Numpad6']
}, {
  action: ['data-action', 'operation'],
  textElement: '+',
  key: ['data_key', 'NumpadAdd']
}, {
  action: ['data-action', 'number'],
  textElement: '7',
  key: ['data_key', 'Numpad7']
}, {
  action: ['data-action', 'number'],
  textElement: '8',
  key: ['data_key', 'Numpad8']
}, {
  action: ['data-action', 'number'],
  textElement: '9',
  key: ['data_key', 'Numpad9']
}, {
  action: ['data-action', 'operation'],
  textElement: '-',
  key: ['data_key', 'NumpadSubtract']
}, {
  action: ['data-action', 'number'],
  textElement: '.',
  key: ['data_key', 'NumpadDecimal']
}, {
  action: ['data-action', 'number'],
  textElement: '0',
  key: ['data_key', 'Numpad0']
}, {
  action: ['data-action', 'equals'],
  textElement: '=',
  key: ['data_key', 'NumpadEnter']
}, {
  action: ['data-action', 'sqrt'],
  textElement: 'sq',
  key: ['data_key', 'Digit7']
}];
/* harmony default export */ __webpack_exports__["default"] = (objCalculator);

/***/ }),

/***/ "./calculator-view.js":
/*!****************************!*\
  !*** ./calculator-view.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * Создаёт новый элементы для страницы с заданными тегами
 * 
 * @param {string} tag отвечает, за создание элемента с заданным тегом
 * @param {string} className назначает классы для созданного тега
 * @param {string} attribute создаёт значение атрибута data-* для созданного тега
 * @param {string} textElement текст тега
 * 
 * @return {Node} element итоговый узел DOM
 */
// может попробовать сделать массив из двух значений и аккх0ъъ и аккх1ъ
var viewCalculator = function viewCalculator(tag, className, attribute, textElement, attribute2) {
  var element = document.createElement(tag);
  if (className !== undefined) element.classList.add(className);
  if (attribute !== undefined) element.setAttribute(attribute[0], attribute[1]);
  if (attribute2 !== undefined) element.setAttribute(attribute2[0], attribute2[1]);
  if (textElement !== undefined) element.innerHTML = textElement;
  return element;
};

/* harmony default export */ __webpack_exports__["default"] = (viewCalculator);

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculator_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator-logic */ "./calculator-logic.js");
/* harmony import */ var _calculator_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculator-view */ "./calculator-view.js");
/* harmony import */ var _calculator_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculator-object */ "./calculator-object.js");
/* harmony import */ var _calculator_error_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calculator-error-view */ "./calculator-error-view.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./style.css");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
  сначала нажимаем числа - потом нажимаем на знак корня и получаем результат (25 √ => 5)
   //работает, но слишком долгий звук. Нужен звук куда короче по длительности

 */

/*
  var audio = new Audio(); // Создаём новый элемент Audio
 audio.src = 'click.mp3'; // Указываем путь к звуку "клика"
 audio.currentTime = 0;
 audio.play();
*/




 // import './vanilla-tilt';

var _document = document,
    body = _document.body;
var cardBody = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'calculator');
var output = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'output');
cardBody.append(output);
var outputContainer = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'output-container');
output.append(outputContainer);
var calculatorNumbers = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'calculator-numbers');
var calculatorGrid = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'calculator-grid');
calculatorNumbers.append(calculatorGrid);
var previousOperandTextElement = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'previous-operand');
var currentOperandTextElement = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'current-operand', undefined, '0');
var calculator = new _calculator_logic__WEBPACK_IMPORTED_MODULE_0__.default(previousOperandTextElement, currentOperandTextElement);
outputContainer.append(previousOperandTextElement, currentOperandTextElement);
var error = (0,_calculator_error_view__WEBPACK_IMPORTED_MODULE_3__.default)();
var errorBtn = error.querySelector('.error__btn');
errorBtn.addEventListener('click', function () {
  error.remove();
  cardBody.append(output);
  cardBody.append(calculatorNumbers);
});
var audio = new Audio();
audio.src = 'klock.mp3';
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

var ButtonCalculator = /*#__PURE__*/function () {
  // класс, который отвечает за нажатие кнопок калькулятора
  function ButtonCalculator(elem) {
    _classCallCheck(this, ButtonCalculator);

    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
    elem.onkeydown = this.onKeydown.bind(this);
    elem.onkeyup = this.onKeyup.bind(this);
  }

  _createClass(ButtonCalculator, [{
    key: "allClear",
    value: function allClear() {
      calculator.clear();
    }
  }, {
    key: "delete",
    value: function _delete() {
      calculator.delete();
    }
  }, {
    key: "operation",
    value: function operation(textElement) {
      calculator.choseOperation(textElement);
    }
  }, {
    key: "number",
    value: function number(textElement) {
      calculator.appendNumber(textElement);
    }
  }, {
    key: "equals",
    value: function equals() {
      calculator.compute(true);
    }
  }, {
    key: "sqrt",
    value: function sqrt() {
      calculator.sqrtOperation();
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var action = e.target.dataset.action;
      var textElement = e.target.textContent;

      if (action) {
        this[action](textElement);
        var isError = calculator.updateDisplay();
        audio.currentTime = 0;
        audio.play();

        if (isError) {
          calculatorNumbers.remove();
          output.remove();
          cardBody.append(error);
        }
      }
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(e) {
      var button = this._elem.querySelector("[data_key=".concat(e.code, "]"));

      if (button === undefined) return;
      var action = button.dataset.action;
      var textElement = button.textContent;

      if (action) {
        this[action](textElement);
        calculator.updateDisplay();
        audio.currentTime = 0;
        audio.play();
      }

      button.classList.add('playing');
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      var button = this._elem.querySelector("[data_key=".concat(e.code, "]"));

      if (button === undefined) return;
      button.classList.remove('playing');
    }
  }]);

  return ButtonCalculator;
}();
/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */


var _iterator = _createForOfIteratorHelper(_calculator_object__WEBPACK_IMPORTED_MODULE_2__.default),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var item = _step.value;
    var action = item.action,
        textElement = item.textElement,
        key = item.key;
    var btn = (0,_calculator_view__WEBPACK_IMPORTED_MODULE_1__.default)('button', undefined, action, textElement, key);

    if (!/[0-9]/.test(+btn.textContent)) {
      btn.classList.add('calculator-action');
    }

    calculatorGrid.append(btn);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

new ButtonCalculator(calculatorGrid);
cardBody.append(calculatorNumbers);
body.prepend(cardBody);
/*
const destroyBox = document.querySelectorAll(".calculator-numbers");
const settings = {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 1 
  };

const init = () => VanillaTilt.init(destroyBox, settings);
init();
*/
}();
/******/ })()
;
//# sourceMappingURL=main.js.map