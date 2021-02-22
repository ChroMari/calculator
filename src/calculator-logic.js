class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.clear();
  }

  clear () {
    this.currentOperand = '0'; // показывает большое число на экране в данный момент
    this.previousOperand = '';
    this.operation = undefined;

    this.equals = false; // флаг для знака равно
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
    if ((number === '.' && this.currentOperand.includes('.')) || (number === '0' && (this.currentOperand === '0' || this.currentOperand === '-'))) return; // позволяет поставить только одну точку в числе
   // if (number === '0' && this.currentOperand === '0') return; //позволяет не наставить вначале кучу нулей
    if(this.currentOperand === '0' && /[1-9]/.test(number)) this.currentOperand = ''; // если у нас число состоит только из 0 то делаем сброс
    if (this.currentOperand === '-' && number === '.') this.currentOperand = '-0';
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  choseOperation (operation) {
    if (this.equals) this.equals = false;
    if (this.currentOperand === '0' && operation !== '-') return; // если число не нажали, то он ничего делать не будет
    if (this.currentOperand === '0'  && operation === '-') { 
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
        computation = prev**current; // степень 0.5 нужно отловить ошибку на этот момент
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

  sqrtOperation () {
    const current = parseFloat(this.currentOperand);

    if (Number.isNaN(current)) return;

    this.currentOperand = Math.sqrt(current);

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

    // нужно обработать поведение с плавующей запятой
    this.currentOperandTextElement.innerText = this.currentOperand;

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText =  this.previousOperand;
    }
    
  }
}

export default Calculator;