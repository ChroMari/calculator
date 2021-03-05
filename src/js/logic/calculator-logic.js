/**
 * Класс, который отвечает за логику вычислений калькулятора.
 */

class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.clear();
  }

  clear () {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;

    this.equals = false;
  }

  delete () {
    if (this.currentOperand === '0') return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') this.currentOperand = '0';
  }

  appendNumber (number) {
    if (this.equals) {
      this.currentOperand = '0';
      this.equals = false;
    }
    if ((number === '.' && this.currentOperand.includes('.')) || (number === '0' && (this.currentOperand === '0' || this.currentOperand === '-'))) return;
    if(this.currentOperand === '0' && /[1-9]/.test(number)) this.currentOperand = '';
    if (this.currentOperand === '-' && number === '.') this.currentOperand = '-0';
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  choseOperation (operation) {
    if (this.equals) this.equals = false;
    if (this.currentOperand === '0' && operation !== '-') {
      this.operation = operation;
      return;
    }
    if (this.currentOperand === '0'  && operation === '-') { 
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

  compute (isEquals = false) {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (Number.isNaN(prev) || Number.isNaN(current)) return;

    switch (this.operation) {
      case '+' : 
        computation = prev + current;
        break;
      case '-' : 
        computation = prev - current;
        break;
      case '*' : 
        computation = prev * current;
        break;
      case '*/*' : 
        computation = prev / current;
        break;
      case '^' : 
        computation = prev**current;
        break;
      default:
        return;
    }

    this.currentOperand = +computation.toFixed(10);

    if (Number.isNaN(this.currentOperand)) {
      this.currentOperand = false;
    }

    this.operation = undefined;
    this.previousOperand = '';
    this.equals = isEquals;
  }

  sqrtOperation () {
    const current = parseFloat(this.currentOperand);

    if (Number.isNaN(current)) return;

    this.currentOperand = Math.sqrt(current);
    this.equals = true;

    if (Number.isNaN(this.currentOperand)) {
      this.currentOperand = false;
    }
  }

  updateDisplay () {
    if (this.currentOperand === false || this.currentOperand === Infinity) {
      this.currentOperandTextElement.innerText = '';
      this.previousOperandTextElement.innerText =  '0';
      this.equals = true;
      this.currentOperand = '0';
      return true;
    }

    this.currentOperandTextElement.innerText = this.currentOperand;

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText =  this.previousOperand;
    }
    return false;
  }
}

export default Calculator;