/**
 * Данный файл используется, чтобы полностью отрисовать калькулятор и вернуть главный узел калькулятора 
 * со всеми его child элементам.
 * 
 */
import viewCalculator from './calculator-view';
import objCalculator from "../bd/calculator-object";

const render = () => {
  const { body } = document;
  const calculatorBody = viewCalculator('div', 'calculator'); // всё тело калькулятора

  const calculatorOutput = viewCalculator('div', 'output'); // поле где мы видим вычисления
  const outputContainer = viewCalculator('div', 'output-container'); // контейнер для этих вычислений
  const previousOperandTextElement = viewCalculator('div', 'previous-operand'); // текущие вычисления
  const currentOperandTextElement = viewCalculator('div', 'current-operand', undefined, '0'); // итоговый результат

  const calculatorNumbers = viewCalculator('div', 'calculator-numbers'); // поле на котором будут размещены числа и операторы
  const calculatorContainerNumbers = viewCalculator('div', 'calculator-grid'); // контейнер для чисел

   /* eslint no-restricted-syntax: ["off", "ForOfStatement"] */
  for (const item of objCalculator) {
    const { action, textElement, key } = item;
    const btn = viewCalculator('button', undefined,  action, textElement, key);
    if (!/[0-9]/.test(+btn.textContent)) {
      btn.classList.add('calculator-action');
    }
    calculatorContainerNumbers.append(btn); // добавляем все кнопки
  }

  calculatorBody.append(calculatorOutput, calculatorNumbers);
  calculatorOutput.append(outputContainer);
  outputContainer.append(previousOperandTextElement, currentOperandTextElement);
  calculatorNumbers.append(calculatorContainerNumbers);

  body.append(calculatorBody);
  return calculatorBody;
}

export default render;