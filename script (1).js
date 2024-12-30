const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <div class="actions">
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
}

function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    } else {
        alert('Please enter valid expense details.');
    }
}

function editExpense(index) {
    const expense = expenses[index];
    const newName = prompt('Edit expense name:', expense.name);
    const newAmount = parseFloat(prompt('Edit expense amount:', expense.amount));
    if (newName && !isNaN(newAmount)) {
        expenses[index] = { name: newName.trim(), amount: newAmount };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

function deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

addExpenseButton.addEventListener('click', addExpense);

renderExpenses();