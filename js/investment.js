/**
 * INVESTMENT CALCULATOR - JavaScript
 */

function calculateInvestment(event) {
    event.preventDefault();
    
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) || 0;
    const regularContribution = parseFloat(document.getElementById('regularContribution').value) || 0;
    const contributionFrequency = parseInt(document.getElementById('contributionFrequency').value) || 12;
    const annualReturn = parseFloat(document.getElementById('annualReturn').value) || 0;
    const investmentYears = parseInt(document.getElementById('investmentYears').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) || 0;
    
    const rate = annualReturn / 100;
    const periods = investmentYears;
    
    // Future value of initial investment
    const futureValueInitial = initialInvestment * Math.pow(1 + rate, periods);
    
    // Future value of regular contributions
    let futureValueContributions = 0;
    if (regularContribution > 0) {
        const contributionsPerYear = contributionFrequency;
        const ratePerPeriod = rate / contributionsPerYear;
        const totalPeriods = investmentYears * contributionsPerYear;
        
        futureValueContributions = regularContribution * 
            ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod) * 
            (1 + ratePerPeriod);
    }
    
    const futureValue = futureValueInitial + futureValueContributions;
    const totalInvested = initialInvestment + (regularContribution * contributionFrequency * investmentYears);
    const totalReturns = futureValue - totalInvested;
    const roi = totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(1) : 0;
    
    // Calculate inflation-adjusted value
    const inflationAdjustedValue = futureValue / Math.pow(1 + inflationRate / 100, investmentYears);
    
    document.getElementById('futureValue').textContent = formatCurrency(futureValue);
    document.getElementById('totalInvested').textContent = formatCurrency(totalInvested);
    document.getElementById('totalReturns').textContent = formatCurrency(totalReturns);
    document.getElementById('roi').textContent = roi + '%';
    
    // Update ROI color
    const roiElement = document.getElementById('roi');
    roiElement.parentElement.style.background = totalReturns >= 0 ? 
        'linear-gradient(135deg, #27ae60 0%, #229954 100%)' : 
        'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    
    document.getElementById('investmentResults').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('investmentResults').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function resetInvestmentForm() {
    document.getElementById('investmentForm').reset();
    document.getElementById('initialInvestment').value = 10000;
    document.getElementById('regularContribution').value = 500;
    document.getElementById('contributionFrequency').value = 12;
    document.getElementById('annualReturn').value = 8;
    document.getElementById('investmentYears').value = 10;
    document.getElementById('inflationRate').value = 3;
    document.getElementById('investmentResults').classList.remove('show');
}

function getSelectedCurrency() {
    const select = document.getElementById('currencySelect');
    return select ? select.value : 'USD';
}

function formatCurrency(value) {
    const currency = getSelectedCurrency();
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
