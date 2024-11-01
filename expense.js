const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expenseCategoryInput = document.getElementById('expense-category');
const expensesList = document.getElementById('expenses');
const totalExpenseDisplay = document.getElementById('total-expense');
const filterCategorySelect = document.getElementById('filter-category');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Display initial expenses and total
displayExpenses();
updateTotal();

// Add expense
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const date = expenseDateInput.value;
    const category = expenseCategoryInput.value;

    if (name && !isNaN(amount) && amount > 0 && date) {
        const expense = { id: Date.now(), name, amount, date, category };
        expenses.push(expense);
        saveAndRenderExpenses();
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseDateInput.value = '';
    } else {
        alert('Please enter a valid expense name, amount, and date.');
    }
}

// Edit expense
function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
        expenseNameInput.value = expense.name;
        expenseAmountInput.value = expense.amount;
        expenseDateInput.value = expense.date;
        expenseCategoryInput.value = expense.category;
        deleteExpense(id);
    }
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveAndRenderExpenses();
}

// Save to local storage and render expenses
function saveAndRenderExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    updateTotal();
}

// Display expenses with optional filter
function displayExpenses() {
    expensesList.innerHTML = '';
    const filteredExpenses = filterCategorySelect.value === 'All'
        ? expenses
        : expenses.filter(exp => exp.category === filterCategorySelect.value);

    filteredExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name} - $${expense.amount.toFixed(2)} (${expense.date}) - ${expense.category}</span>
            <div>
                <button class="edit" onclick="editExpense(${expense.id})">✏️</button>
                <button class="delete" onclick="deleteExpense(${expense.id})">🗑️</button>
            </div>
        `;
        expensesList.appendChild(li);
    });
}

// Update total expense
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpenseDisplay.textContent = `Total Expense: $${total.toFixed(2)}`;
}

// Filter expenses by category
function filterExpenses() {
    displayExpenses();
}

// Sort expenses by date
function sortExpensesByDate() {
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveAndRenderExpenses();
}
