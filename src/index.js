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

import Calculator from './calculator-logic';
import viewCalculator from './calculator-view';
import objCalculator from './calculator-object';
import errorNode from './calculator-error-view';

import './style.css'
import './vanilla-tilt';

const { body } = document;
const cardBody = viewCalculator('div', 'calculator');
const output = viewCalculator('div', 'output');
cardBody.append(output);
const outputContainer = viewCalculator('div', 'output-container');
output.append(outputContainer);

const calculatorNumbers = viewCalculator('div', 'calculator-numbers');
const calculatorGrid = viewCalculator('div', 'calculator-grid');
calculatorNumbers.append(calculatorGrid);

const previousOperandTextElement = viewCalculator('div', 'previous-operand');
const currentOperandTextElement = viewCalculator('div', 'current-operand', undefined, '0');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

outputContainer.append(previousOperandTextElement, currentOperandTextElement);

const error = errorNode();
const errorBtn = error.querySelector('.error__btn');
errorBtn.addEventListener('click', () => {
  error.remove();
  cardBody.append(output);
  cardBody.append(calculatorNumbers);
})


const audio = new Audio();
audio.src = 'klock.mp3';

/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
class ButtonCalculator { // класс, который отвечает за нажатие кнопок калькулятора
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
    elem.onkeydown = this.onKeydown.bind(this);
    elem.onkeyup = this.onKeyup.bind(this);
  }

  allClear () {
    calculator.clear();
    return this;
  }
  
  delete () {
    calculator.delete();
    return this;
  }
  
  operation (textElement) {
    calculator.choseOperation(textElement);
    return this;
  }
  
  number (textElement) {
    calculator.appendNumber(textElement);
    return this;
  }
  
  equals () {
    calculator.compute(true);
    return this;
  }
  
  sqrt () {
    calculator.sqrtOperation();
    return this;
  }
  
  onClick (e) {
    const {action} = e.target.dataset;
    const textElement = e.target.textContent;

    if (action) {
      this[action](textElement);
      const isError = calculator.updateDisplay();
      audio.currentTime = 0;
      audio.play();

      if (isError) {
        calculatorNumbers.remove();
        output.remove();
        cardBody.append(error);
      }
    }
  };

  onKeydown (e) {
    const button = this._elem.querySelector(`[data_key=${e.code}]`);

    if (button === undefined) return;

    const {action} = button.dataset;
    const textElement = button.textContent;

    if (action) {
      this[action](textElement);
      calculator.updateDisplay();
      audio.currentTime = 0;
      audio.play();
    }

    button.classList.add('playing');
  };

  onKeyup (e) {
    const button = this._elem.querySelector(`[data_key=${e.code}]`);
    if (button === undefined) return;
    button.classList.remove('playing');
  }
}

 /* eslint no-restricted-syntax: ["off", "ForOfStatement"] */
for (const item of objCalculator) {
  const { action, textElement, key } = item;
  const btn = viewCalculator('button', undefined,  action, textElement, key);
  if (!/[0-9]/.test(+btn.textContent)) {
    btn.classList.add('calculator-action');
  }
  calculatorGrid.append(btn);
}

(()=>new ButtonCalculator(calculatorGrid))();

cardBody.append(calculatorNumbers);

body.prepend(cardBody);

/* global VanillaTilt */
/* eslint no-undef: "error" */
const destroyBox = document.querySelectorAll(".calculator-numbers");
const settings = {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 1 
  };

const init = () => VanillaTilt.init(destroyBox, settings);
init();


