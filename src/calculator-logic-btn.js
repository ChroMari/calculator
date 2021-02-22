class ButtonCalculator { // класс, который отвечает за нажатие кнопок калькулятора
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
    elem.onkeydown = this.onKeydown.bind(this);
    elem.onkeyup = this.onKeyup.bind(this);
  }

  allClear = () => calculator.clear();
  
  delete = () => calculator.delete();
  
  operation = (textElement) => calculator.choseOperation(textElement);
  
  number = (textElement) => calculator.appendNumber(textElement);
  
  equals = () => calculator.compute(true);
  
  sqrt = () => calculator.sqrtOperation();
  

  onClick (e) {
    const action = e.target.dataset.action;
    const textElement = e.target.textContent;

    if (action) {
      this[action](textElement);
      calculator.updateDisplay();
      audio.currentTime = 0;
      audio.play();
    }
  };

  onKeydown (e) {
    const button = this._elem.querySelector(`[data_key=${e.code}]`);

    if (button == undefined) return;

    const action = button.dataset.action;
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
    if (button == undefined) return;
    button.classList.remove('playing');
  }
}
