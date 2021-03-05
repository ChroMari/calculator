/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import Calculator from './js/logic/calculator-logic';
import { renderNode } from './js/view/calculator-error-view';
import render from './js/view/render';
import vanillaTiltView from './js/view/vanillaTilt-view';
import './styles/style.sass';
import audioSrc from './assets/audio/c.mp3';

const calculatorBody = render();

const previousOperandTextElement = calculatorBody.querySelector('.calculator__output-previous');
const currentOperandTextElement = calculatorBody.querySelector('.calculator__output-current');
const output = calculatorBody.querySelector('.calculator__output');
const calculatorNumbers = calculatorBody.querySelector('.calculator__numbers');
const calculatorGrid = calculatorBody.querySelector('.calculator__numbers--grid');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

const audio = new Audio();

class ButtonCalculator {
  constructor(elem) {
    this._elem = elem;
    elem.onmousedown = this.mouseDown.bind(this);
    elem.onmouseup = this.mouseUp.bind(this);
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

  addClass(keyBtn) {
    if (!keyBtn.classList.contains('calculator__numbers-btn--action')) {
      keyBtn.classList.add('calculator__numbers-btn--action');
    } 
    audio.src = audioSrc;
    audio.currentTime = 0;
    audio.play();
    return this;
  }

  addUpdate(btn) {
    const isError = calculator.updateDisplay();
    this.addClass(btn);

    if (isError) {
      btn.classList.remove('calculator__numbers-btn--action');
      calculatorNumbers.remove();
      output.remove();
      renderNode(output, calculatorNumbers, calculatorBody);
    }
  }

  mouseDown(e) {
    const {action} = e.target.dataset;
    const textElement = e.target.textContent;

    if (action) {
      this[action](textElement);
      this.addUpdate(e.target);
    }
  }

  mouseUp(e) {
    e.target.classList.remove('calculator__numbers-btn--action');
    return this;
  }
}

const btnCalculator = new ButtonCalculator(calculatorGrid);

vanillaTiltView(calculatorNumbers);

const code = ['Delete', 'Backspace', 'Digit6', 'NumpadDivide', 'Numpad1', 'Numpad2', 'Numpad3', 'NumpadMultiply', 
'Numpad4', 'Numpad5', 'Numpad6', 'NumpadAdd', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadSubtract', 'NumpadDecimal', 
'Numpad0', 'NumpadEnter', 'Digit7'];

window.addEventListener('keydown', (e) => {
  const key = e.code;

  if (code.indexOf(key) !== -1) {
    const keyDiv = calculatorGrid.querySelector(`[data_key="${key}"]`);
    if (!keyDiv.classList.contains('calculator__numbers-btn--action')) {
      keyDiv.classList.add('calculator__numbers-btn--action');
      audio.src = audioSrc;
      audio.currentTime = 0;
      audio.play();

      const {action} = keyDiv.dataset;
      const textElement = keyDiv.textContent;
      switch (action) {
        case 'allClear': {
          btnCalculator.allClear();
          break;
        }
        case 'delete': {
          btnCalculator.delete();
          break;
        } 
        case 'operation': {
          btnCalculator.operation(textElement);
          break;
        }
        case 'number': {
          btnCalculator.number(textElement);
          break;
        }
        case 'equals': {
          btnCalculator.equals();
          break;
        }
        case 'sqrt': {
          btnCalculator.sqrt();
          break;
        }
        default: return;
      }
      btnCalculator.addUpdate(keyDiv);
    } 
  }
});

window.addEventListener('keyup', (e) => {
  const key = e.code;

  if (code.indexOf(key) !== -1) {
    const keyDiv = calculatorGrid.querySelector(`[data_key="${key}"]`);
    if (keyDiv.classList.contains('calculator__numbers-btn--action')) {
      keyDiv.classList.remove('calculator__numbers-btn--action');
    } 
  }
});