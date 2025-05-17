import { AbstractComponent } from '../framework/view/abstract-component.js';

function createExpenseListComponentTemplate() {
    return (
        `<ul id="expense-list">
                
        </ul>`
      );
}

export default class ExpensesListComponent extends AbstractComponent{
  constructor(){
    super();
  }
  
  get template() {
    return createExpenseListComponentTemplate();
  }
  
  getList(){
    if (!this.element) {
        this.element = createElement(this.template);
    }
    
    return document.getElementById('expense-list');
  }
}