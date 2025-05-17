import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddExpenseComponentTemplate() {
    return (
        `
            <form id="expense-form">
                <input type="text" id="expense-name" placeholder="Наименование расхода" required />
                <input type="number" id="expense-amount" placeholder="Сумма" required />
                <select id="expense-category" required>
                    <option value="">Выбрать категорию</option>
                    <option value="Food">Еда</option>
                    <option value="Transport">Транспорт</option>
                    <option value="Entertainment">Развлечения</option>
                    <option value="Other">Другое</option>
                </select>
                <button type="submit">Добавить расход</button>
            </form>`
      );
}

export default class FormAddExpenseComponent extends AbstractComponent{
  #handleClick = null;
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }
  
  get template() {
    return createFormAddExpenseComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}   