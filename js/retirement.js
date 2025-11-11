/**
 * RETIREMENT CALCULATOR - JavaScript
 */

function calculateRetirement(event) {
    event.preventDefault();
    
    const currentAge = parseInt(document.getElementById('currentAge').value) || 0;
    const retirementAge = parseInt(document.getElementById('retirementAge').value) || 0;
    const currentSavings = parseFloat(document.getElementById('currentSavings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value) || 0;
    const retirementIncome = parseFloat(document.getElementById('retirementIncome').value) || 0;
    
    if (retirementAge <= currentAge) {
        alert('Retirement age must be greater than current age.');
        return;
    }
    
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyRate = (expectedReturn / 100) / 12;
    const months = yearsToRetirement * 12;
    
    // Future value of current savings
    const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions
    let futureValueContributions = 0;
    if (monthlyContribution > 0) {
        futureValueContributions = monthlyContribution * 
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }
    
    const projectedSavings = futureValueCurrent + futureValueContributions;
    const totalContributions = currentSavings + (monthlyContribution * months);
    
    // Recommended savings using 4% rule (need 25x annual income)
    const savingsGoal = retirementIncome * 25;
    
    // Check if on track
    const onTrack = projectedSavings >= savingsGoal;
    const percentage = ((projectedSavings / savingsGoal) * 100).toFixed(0);
    
    document.getElementById('retirementAgeResult').textContent = retirementAge;
    document.getElementById('projectedSavings').textContent = formatCurrency(projectedSavings);
    document.getElementById('savingsGoal').textContent = formatCurrency(savingsGoal);
    document.getElementById('totalContributions').textContent = formatCurrency(totalContributions);
    
    const statusElement = document.getElementById('onTrackStatus');
    if (onTrack) {
        statusElement.textContent = '✓ On Track';
        statusElement.style.color = '#27ae60';
    } else {
        statusElement.textContent = `${percentage}% of Goal`;
        statusElement.style.color = percentage >= 75 ? '#f39c12' : '#e74c3c';
    }
    
    document.getElementById('retirementResults').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('retirementResults').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function resetRetirementForm() {
    document.getElementById('retirementForm').reset();
    document.getElementById('currentAge').value = 35;
    document.getElementById('retirementAge').value = 65;
    document.getElementById('currentSavings').value = 50000;
    document.getElementById('monthlyContribution').value = 500;
    document.getElementById('expectedReturn').value = 7;
    document.getElementById('retirementIncome').value = 60000;
    document.getElementById('retirementResults').classList.remove('show');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
