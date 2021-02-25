/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import Calculator from './js/logic/calculator-logic';
import { renderNode } from './js/view/calculator-error-view';
import render from './js/view/render';
import vanillaTiltView from './js/view/vanillaTilt-view';
import './styles/style.css';
import audioSrc from './assets/audio/c.mp3';

const calculatorBody = render();

const previousOperandTextElement = calculatorBody.querySelector('.previous-operand');
const currentOperandTextElement = calculatorBody.querySelector('.current-operand');
const output = calculatorBody.querySelector('.output');
const calculatorNumbers = calculatorBody.querySelector('.calculator-numbers');
const calculatorGrid = calculatorBody.querySelector('.calculator-grid');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

const audio = new Audio();
audio.src = audioSrc;

class ButtonCalculator {
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
        renderNode(output, calculatorNumbers, calculatorBody);
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

(()=>new ButtonCalculator(calculatorGrid))();

vanillaTiltView(calculatorNumbers);


