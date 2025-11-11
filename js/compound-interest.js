/**
 * COMPOUND INTEREST CALCULATOR - JavaScript
 */

function calculateCompound(event) {
    event.preventDefault();
    
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const years = parseInt(document.getElementById('years').value) || 0;
    const compoundFrequency = parseInt(document.getElementById('compoundFrequency').value) || 12;
    
    const rate = interestRate / 100;
    const periods = years * compoundFrequency;
    
    // Future value of initial investment
    let futureValuePrincipal = principal * Math.pow(1 + rate / compoundFrequency, periods);
    
    // Future value of monthly contributions
    let futureValueContributions = 0;
    if (monthlyContribution > 0) {
        const monthlyRate = rate / 12;
        const monthlyPeriods = years * 12;
        futureValueContributions = monthlyContribution * 
            ((Math.pow(1 + monthlyRate, monthlyPeriods) - 1) / monthlyRate);
    }
    
    const futureValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + (monthlyContribution * years * 12);
    const totalInterest = futureValue - totalContributions;
    
    document.getElementById('futureValue').textContent = formatCurrency(futureValue);
    document.getElementById('totalContributions').textContent = formatCurrency(totalContributions);
    document.getElementById('totalInterestEarned').textContent = formatCurrency(totalInterest);
    
    document.getElementById('compoundResults').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('compoundResults').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function resetCompoundForm() {
    document.getElementById('compoundForm').reset();
    document.getElementById('principal').value = 10000;
    document.getElementById('monthlyContribution').value = 200;
    document.getElementById('interestRate').value = 7;
    document.getElementById('years').value = 20;
    document.getElementById('compoundResults').classList.remove('show');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
