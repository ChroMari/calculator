const errorNode = () => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');
  errorContainer.innerHTML = `
    <div class="error-container__icon"></div>
    <h4 class="error-container__title">Ошибка</h4>
    <p class="error-container__text">вы сделали одну из недопустимых операций</p>
    <ul class="error-container__list">
      <li class="error-container__list-item">Поделили число на ноль</li>
      <li class="error-container__list-item">Поделили ноль на ноль</li>
      <li class="error-container__list-item">Попыталась получить корень из отрицательного числа</li>
    </ul>
    
    <button class="error-container__button">Продолжить</button>
  `;
  return errorContainer;
}

const renderNode = (output, calculatorNumbers, calculatorBody) => {
  const error = errorNode(); 
  const errorBtn = error.querySelector('.error-container__button');
  calculatorBody.append(error);
  errorBtn.addEventListener('click', () => {
    error.remove();
    calculatorBody.append(output);
    calculatorBody.append(calculatorNumbers);
  })
}

export { errorNode, renderNode };