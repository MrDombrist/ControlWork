import { AbstractComponent } from '../framework/view/abstract-component.js';

function createExpensesBoardComponent() {
    return (
        `<div class="container">
          <h1>Учет расходов</h1>

          <h2>Добавить новый расход</h2>
          <div class="expense-form"></div>
          
          <h2>Фильтровать по категории</h2>
          <div class="expense-filter"></div>

          <h2>Список расходов</h2>
          <div class="expense-list"></div>
        </div>`
      );
}

export default class ExpensesBoardComponent extends AbstractComponent{
  constructor() {
    super();
  }
  
  get template() {
    return createExpensesBoardComponent();
  }
}