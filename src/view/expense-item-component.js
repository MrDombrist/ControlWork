import { AbstractComponent } from '../framework/view/abstract-component.js';

function createExpenseItemComponentTemplate(expense) {
  const categoryNames = {
    'Food': 'Еда',
    'Transport': 'Транспорт',
    'Entertainment': 'Развлечения',
    'Other': 'Другое'
  };

  return (
      `
      <li class="expense-item" data-id="${expense.id}">
        <div class="expense-details">
          <span>${expense.name}</span>
          <span>${expense.amount} ₽</span>
          <span>${categoryNames[expense.category] || expense.category}</span>
        </div>
        <div>
          <button class="expense-item__edit">Редактировать</button>
          <button class="expense-item__delete">Удалить</button>
        </div>
      </li>`
    );
}

export default class ExpenseItemComponent extends AbstractComponent{
  constructor({expense}){
    super();
    this.expense = expense;
  }

  get template() {
    return createExpenseItemComponentTemplate(this.expense);
  }

  get deleteButton(){
    return this.element.querySelector('.expense-item__delete')
  }

  get editButton(){
     return this.element.querySelector('.expense-item__edit')
  }

  get id(){
    return this.expense.id;
  }
}