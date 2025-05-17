import { AbstractComponent } from '../framework/view/abstract-component.js';

function createExpenseFilterComponentTemplate() {
    return (
        `<select id="category-filter">
                <option value="all">Все</option>
                <option value="Food">Еда</option>
                <option value="Transport">Транспорт</option>
                <option value="Entertainment">Развлечения</option>
                <option value="Other">Другое</option>
            </select>`
      );
}

export default class ExpenseFilterComponent extends AbstractComponent{
  constructor() {
    super();
  }
  
  get template() {
    return createExpenseFilterComponentTemplate();
  }
}