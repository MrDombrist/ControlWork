import {render} from './framework/render.js';
import ExpensesBoardPresenter from './presenter/expense-board-presenter.js';
import FormAddExpenseComponent from './view/new-expense-form-component.js';
import ExpensesBoardComponent from './view/expense-board-component.js';
import ExpensesModel from './model/expense-model.js';
import ExpenseFilterComponent from './view/expense-filter-component.js';

const body = document.querySelector('body');
const expensesBoard = new ExpensesBoardComponent();

render(expensesBoard, body);

const expensesFilter = new ExpenseFilterComponent();
const expensesFilterContainer = document.querySelector('.expense-filter');
render(expensesFilter, expensesFilterContainer);

const formContainer = document.querySelector('.expense-form');
const expensesBoardContainer = document.querySelector('.expense-list');

const expensesModel = new ExpensesModel();
const expensesBoardPresenter = new ExpensesBoardPresenter({
    boardContainer: expensesBoardContainer,
    expensesModel: expensesModel,
});

expensesBoardPresenter.init();

const formAddExpenseComponent = new FormAddExpenseComponent({
    onClick: handleNewExpenseButtonClick
});

function handleNewExpenseButtonClick() {
    expensesBoardPresenter.createExpense();
}

render(formAddExpenseComponent, formContainer);