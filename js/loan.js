/**
 * LOAN CALCULATOR - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    loadSavedLoanData();
});

function calculateLoan(event) {
    event.preventDefault();
    
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
    
    if (loanAmount <= 0 || loanTerm <= 0) {
        alert('Please enter valid loan details.');
        return;
    }
    
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;
    
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
        monthlyPayment = loanAmount / numPayments;
    } else {
        monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - loanAmount;
    
    document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('totalPaid').textContent = formatCurrency(totalPaid);
    document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
    document.getElementById('loanAmountResult').textContent = formatCurrency(loanAmount);
    
    document.getElementById('loanResults').classList.add('show');
    saveLoanData();
    
    setTimeout(() => {
        document.getElementById('loanResults').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function resetLoanForm() {
    document.getElementById('loanForm').reset();
    document.getElementById('loanAmount').value = 15000;
    document.getElementById('interestRate').value = 7.5;
    document.getElementById('loanTerm').value = 5;
    document.getElementById('loanResults').classList.remove('show');
    localStorage.removeItem('loanCalculatorData');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function saveLoanData() {
    const data = {
        loanType: document.getElementById('loanType').value,
        loanAmount: document.getElementById('loanAmount').value,
        interestRate: document.getElementById('interestRate').value,
        loanTerm: document.getElementById('loanTerm').value,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('loanCalculatorData', JSON.stringify(data));
}

function loadSavedLoanData() {
    try {
        const saved = localStorage.getItem('loanCalculatorData');
        if (saved) {
            const data = JSON.parse(saved);
            const daysDiff = (new Date() - new Date(data.timestamp)) / (1000 * 60 * 60 * 24);
            if (daysDiff <= 7) {
                document.getElementById('loanType').value = data.loanType;
                document.getElementById('loanAmount').value = data.loanAmount;
                document.getElementById('interestRate').value = data.interestRate;
                document.getElementById('loanTerm').value = data.loanTerm;
            }
        }
    } catch (e) {
        console.warn('Could not load saved data');
    }
}
