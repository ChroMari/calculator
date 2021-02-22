/**
 * Создаёт новый элементы для страницы с заданными тегами
 * 
 * @param {string} tag отвечает, за создание элемента с заданным тегом
 * @param {string} className назначает классы для созданного тега
 * @param {string} attribute создаёт значение атрибута data-* для созданного тега
 * @param {string} textElement текст тега
 * 
 * @return {Node} element итоговый узел DOM
 */


 // может попробовать сделать массив из двух значений и аккх0ъъ и аккх1ъ
const viewCalculator = (tag, className, attribute, textElement, attribute2) => {
  const element = document.createElement(tag);

  if (className !== undefined) element.classList.add(className);
  if (attribute !== undefined) element.setAttribute(attribute[0], attribute[1]);
  if (attribute2 !== undefined) element.setAttribute(attribute2[0], attribute2[1]);
  if (textElement !== undefined) element.innerHTML = textElement;

  return element;
};

export default viewCalculator;