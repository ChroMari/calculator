/**
 * Данная функция - render - используется, чтобы полностью отрисовать калькулятор и вернуть главный узел калькулятора 
 * со всеми его child элементам.
 * 
 */
import viewCalculator from './calculator-view';
import objCalculator from "../bd/calculator-object";

const render = () => {
  const { body } = document;
  const calculatorBody = viewCalculator('div', 'calculator');
  const calculatorOutput = viewCalculator('div', 'calculator__output');
  const previousOperandTextElement = viewCalculator('div', 'calculator__output-previous');
  const currentOperandTextElement = viewCalculator('div', 'calculator__output-current', undefined, '0');

  const calculatorNumbers = viewCalculator('div', 'calculator__numbers');
  const calculatorContainerNumbers = viewCalculator('div', 'calculator__numbers--grid');

   /* eslint no-restricted-syntax: ["off", "ForOfStatement"] */
  for (const item of objCalculator) {
    const { action, textElement, key } = item;
    const btn = viewCalculator('button', 'calculator__numbers-btn',  action, textElement, key);
    if (!/[0-9]/.test(+btn.textContent)) {
      btn.classList.add('calculator__numbers-btn--operation');
    }
    calculatorContainerNumbers.append(btn);
  }

  calculatorBody.append(calculatorOutput, calculatorNumbers);
  calculatorOutput.append(previousOperandTextElement, currentOperandTextElement);
  calculatorNumbers.append(calculatorContainerNumbers);

  body.append(calculatorBody);
  return calculatorBody;
}

export default render;