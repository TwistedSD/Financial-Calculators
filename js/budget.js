/**
 * BUDGET PLANNER - JavaScript
 */

function calculateBudget(event) {
    event.preventDefault();
    
    const income = parseFloat(document.getElementById('monthlyIncome').value) || 0;
    const housing = parseFloat(document.getElementById('housing').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value) || 0;
    const insurance = parseFloat(document.getElementById('insurance').value) || 0;
    const debt = parseFloat(document.getElementById('debt').value) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
    const otherExpenses = parseFloat(document.getElementById('otherExpenses').value) || 0;
    
    const totalExpenses = housing + utilities + food + transportation + 
                         insurance + debt + entertainment + otherExpenses;
    const remaining = income - totalExpenses;
    const savingsRate = income > 0 ? ((remaining / income) * 100).toFixed(1) : 0;
    
    document.getElementById('totalIncome').textContent = formatCurrency(income);
    document.getElementById('totalExpenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('remaining').textContent = formatCurrency(remaining);
    document.getElementById('savingsRate').textContent = savingsRate + '%';
    
    // Update remaining color based on value
    const remainingElement = document.getElementById('remaining');
    remainingElement.parentElement.style.background = remaining >= 0 ? 
        'linear-gradient(135deg, #27ae60 0%, #229954 100%)' : 
        'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    
    // Create expense breakdown
    createExpenseBreakdown({
        'Housing': housing,
        'Utilities': utilities,
        'Food & Groceries': food,
        'Transportation': transportation,
        'Insurance': insurance,
        'Debt Payments': debt,
        'Entertainment': entertainment,
        'Other': otherExpenses
    }, totalExpenses);
    
    document.getElementById('budgetResults').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('budgetResults').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function createExpenseBreakdown(expenses, total) {
    const container = document.getElementById('budgetBreakdown');
    let html = '<h3 class="mt-3">Expense Breakdown</h3><ul class="breakdown-list">';
    
    for (const [category, amount] of Object.entries(expenses)) {
        const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
        html += `
            <li>
                <span>${category}</span>
                <span>${formatCurrency(amount)} (${percentage}%)</span>
            </li>
        `;
    }
    
    html += '</ul>';
    container.innerHTML = html;
}

function resetBudgetForm() {
    document.getElementById('budgetForm').reset();
    document.getElementById('monthlyIncome').value = 5000;
    document.getElementById('housing').value = 1500;
    document.getElementById('utilities').value = 200;
    document.getElementById('food').value = 600;
    document.getElementById('transportation').value = 400;
    document.getElementById('insurance').value = 300;
    document.getElementById('debt').value = 500;
    document.getElementById('entertainment').value = 300;
    document.getElementById('otherExpenses').value = 200;
    document.getElementById('budgetResults').classList.remove('show');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
