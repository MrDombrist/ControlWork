import { generateID } from "../utils.js";
import { expenses } from "../mock/expenses.js";

export default class ExpensesModel {
    #expenses = expenses;
    #observers = [];
    #currentFilter = 'all';

    get expenses() {
        return this.#currentFilter === 'all'
            ? this.#expenses
            : this.#expenses.filter(expense => expense.category === this.#currentFilter);
    }

    setFilter(category) {
        this.#currentFilter = category;
        this._notifyObservers();
    }

    getExpensesByCategory(category) {
        return this.#expenses.filter(expense => expense.category === category);
    }

    updateExpense(expenseId, updatedFields) {
        this.#expenses = this.#expenses.map(expense =>
            expense.id === expenseId ? { ...expense, ...updatedFields } : expense
        );
        this._notifyObservers();
    }

    addExpense(name, amount, category) {
        const newExpense = {
            name,
            amount: Number(amount),
            category,
            id: generateID()
        };
        this.#expenses.push(newExpense);
        this._notifyObservers();
        return newExpense;
    }

    deleteExpense(expenseId) {
        this.#expenses = this.#expenses.filter(expense => expense.id !== expenseId);
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}