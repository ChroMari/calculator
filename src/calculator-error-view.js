const errorNode = () => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');
  errorContainer.innerHTML = `
    <div class="error__icon"></div>
    <h4 class="error__title">Ошибка</h4>
    <p class="error__text">вы сделали одну из недопустимых операций</p>
    <ul class="error__list">
      <li>Поделили число на ноль</li>
      <li>Поделили ноль на ноль</li>
      <li>Попыталась получить корень из отрицательного числа</li>
    </ul>
    
    <button class="error__btn">Продолжить</button>
  `;
  return errorContainer;
}

export default errorNode;