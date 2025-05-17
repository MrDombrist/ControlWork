import ExpensesListComponent from "../view/expense-list-component.js"
import ExpenseItemComponent from "../view/expense-item-component.js"
import { render } from '../framework/render.js';

export default class ExpensesBoardPresenter {
    #expensesListComponent = new ExpensesListComponent();
    #boardContainer = null;
    #expensesModel = null;

    constructor({ boardContainer, expensesModel }) {
        this.#boardContainer = boardContainer;
        this.#expensesModel = expensesModel;
        this.#expensesModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
        this.#setupFilterHandler();
    }

    #setupFilterHandler() {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (evt) => {
                this.#expensesModel.setFilter(evt.target.value.trim());
            });
        }
    }

    #renderExpense(expense, container) {
        const cmp = new ExpenseItemComponent({ expense });

        cmp.element.dataset.id = expense.id;

        cmp.deleteButton.addEventListener('click', () => {
            this.#expensesModel.deleteExpense(expense.id);
        });

        cmp.editButton.addEventListener('click', () => this.#handleEdit(expense));
        render(cmp, container);
    }

    #handleEdit(expense) {
        const listItem = this.#expensesListComponent
            .getList()
            .querySelector(`[data-id="${expense.id}"]`);

        const categoryOptions = [
            { value: 'Food', text: 'Еда' },
            { value: 'Transport', text: 'Транспорт' },
            { value: 'Entertainment', text: 'Развлечения' },
            { value: 'Other', text: 'Другое' }
        ];

        const optionsHtml = categoryOptions.map(option => 
            `<option value="${option.value}"${expense.category === option.value ? ' selected' : ''}>${option.text}</option>`
        ).join('');

        listItem.innerHTML = `
            <form class="expense-edit-form">
                <input type="text" name="name" value="${expense.name}" required />
                <input type="number" name="amount" value="${expense.amount}" required />
                <select name="category" required>
                    ${optionsHtml}
                </select>
                <button type="submit">Сохранить</button>
                <button type="button" class="cancel">Отмена</button>
            </form>
        `;

        const form = listItem.querySelector('.expense-edit-form');
        const cancelBtn = form.querySelector('.cancel');

        cancelBtn.addEventListener('click', () => {
            this.#handleModelChange();
        });

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formData = new FormData(form);
            const updated = {
                name: formData.get('name').trim(),
                amount: Number(formData.get('amount')),
                category: formData.get('category'),
            };
            this.#expensesModel.updateExpense(expense.id, updated);
        });
    }

    #renderExpenseList(container) {
        const expenseListComponent = new ExpensesListComponent();
        render(expenseListComponent, container);
        const expenseListElement = expenseListComponent.getList();

        const currentExpenses = this.expenses;

        if (currentExpenses.length > 0) {
            currentExpenses.forEach((expense) => this.#renderExpense(expense, expenseListElement));
        } else {
            expenseListElement.innerHTML = '<li class="empty-list">Нет расходов для отображения</li>';
        }
    }

    #renderBoard() {
        render(this.#expensesListComponent, this.#boardContainer);
        this.#renderExpenseList(this.#expensesListComponent.element);
    }

    createExpense() {
        const expenseName = document.getElementById('expense-name').value.trim();
        const expenseAmount = document.getElementById('expense-amount').value;
        const expenseCategory = document.getElementById('expense-category').value.trim();
        
        if (!expenseName || !expenseAmount || !expenseCategory) return;

        this.#expensesModel.addExpense(expenseName, expenseAmount, expenseCategory);
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-category').value = '';
    }

    get expenses() {
        return this.#expensesModel.expenses;
    }

    #clearBoard() {
        this.#expensesListComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
}