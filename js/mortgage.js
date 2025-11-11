/**
 * MORTGAGE CALCULATOR - JavaScript
 * Handles all mortgage calculations, amortization schedules, charts, and UI updates
 */

// Global variables
let amortizationData = [];
let chartInstance = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    setupEventListeners();
    loadSavedData();
});

/**
 * Initialize calculator with default values
 */
function initializeCalculator() {
    // Sync sliders with input fields
    syncSliderWithInput('homePrice', 'homePriceSlider');
    syncSliderWithInput('interestRate', 'interestRateSlider');
    
    // Calculate initial loan amount
    updateLoanAmount();
}

/**
 * Setup all event listeners for real-time updates
 */
function setupEventListeners() {
    // Home price listeners
    const homePrice = document.getElementById('homePrice');
    const homePriceSlider = document.getElementById('homePriceSlider');
    
    homePrice.addEventListener('input', function() {
        homePriceSlider.value = this.value;
        updateLoanAmount();
    });
    
    homePriceSlider.addEventListener('input', function() {
        homePrice.value = this.value;
        updateLoanAmount();
    });
    
    // Down payment listeners
    const downPayment = document.getElementById('downPayment');
    const downPaymentPercent = document.getElementById('downPaymentPercent');
    
    downPayment.addEventListener('input', function() {
        const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
        const percent = (this.value / homePrice) * 100;
        downPaymentPercent.value = percent.toFixed(2);
        updateLoanAmount();
        updatePMI();
    });
    
    downPaymentPercent.addEventListener('input', function() {
        const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
        const amount = (this.value / 100) * homePrice;
        downPayment.value = amount.toFixed(0);
        updateLoanAmount();
        updatePMI();
    });
    
    // Interest rate slider sync
    const interestRate = document.getElementById('interestRate');
    const interestRateSlider = document.getElementById('interestRateSlider');
    
    interestRate.addEventListener('input', function() {
        interestRateSlider.value = this.value;
    });
    
    interestRateSlider.addEventListener('input', function() {
        interestRate.value = this.value;
    });
}

/**
 * Sync slider with text input
 */
function syncSliderWithInput(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);
    
    if (input && slider) {
        slider.value = input.value;
    }
}

/**
 * Update loan amount based on home price and down payment
 */
function updateLoanAmount() {
    const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const loanAmount = homePrice - downPayment;
    
    document.getElementById('loanAmount').value = loanAmount.toFixed(0);
}

/**
 * Auto-calculate PMI if down payment < 20%
 */
function updatePMI() {
    const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const downPaymentPercent = (downPayment / homePrice) * 100;
    
    if (downPaymentPercent < 20) {
        const loanAmount = homePrice - downPayment;
        // PMI is typically 0.5% to 1% of loan amount annually, divided by 12 for monthly
        const pmiMonthly = (loanAmount * 0.007) / 12; // Using 0.7% as average
        document.getElementById('pmi').value = pmiMonthly.toFixed(0);
    } else {
        document.getElementById('pmi').value = 0;
    }
}

/**
 * Main calculation function
 */
function calculateMortgage(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Get all input values
    const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const loanAmount = homePrice - downPayment;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) || 30;
    const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
    const homeInsurance = parseFloat(document.getElementById('homeInsurance').value) || 0;
    const hoaFees = parseFloat(document.getElementById('hoaFees').value) || 0;
    const pmi = parseFloat(document.getElementById('pmi').value) || 0;
    
    // Validate inputs
    if (loanAmount <= 0) {
        alert('Please enter a valid home price and down payment.');
        return;
    }
    
    if (interestRate <= 0) {
        alert('Please enter a valid interest rate.');
        return;
    }
    
    // Calculate monthly payment (Principal & Interest)
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    let monthlyPI = 0;
    if (monthlyInterestRate === 0) {
        monthlyPI = loanAmount / numberOfPayments;
    } else {
        monthlyPI = loanAmount * 
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    // Calculate monthly components
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const monthlyTotal = monthlyPI + monthlyPropertyTax + monthlyHomeInsurance + hoaFees + pmi;
    
    // Calculate totals
    const totalPayment = (monthlyPI * numberOfPayments) + 
                        (monthlyPropertyTax * numberOfPayments) +
                        (monthlyHomeInsurance * numberOfPayments) +
                        (hoaFees * numberOfPayments) +
                        (pmi * numberOfPayments);
    const totalInterest = (monthlyPI * numberOfPayments) - loanAmount;
    
    // Display results
    displayResults({
        monthlyPayment: monthlyTotal,
        monthlyPI: monthlyPI,
        monthlyPropertyTax: monthlyPropertyTax,
        monthlyHomeInsurance: monthlyHomeInsurance,
        hoaFees: hoaFees,
        pmi: pmi,
        totalPayment: totalPayment,
        totalInterest: totalInterest,
        loanAmount: loanAmount
    });
    
    // Generate amortization schedule
    generateAmortizationSchedule(loanAmount, monthlyInterestRate, numberOfPayments, monthlyPI);
    
    // Create chart
    createChart();
    
    // Save data to local storage
    saveData();
    
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.add('show');
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Display calculation results
 */
function displayResults(results) {
    document.getElementById('monthlyPayment').textContent = formatCurrency(results.monthlyPayment);
    document.getElementById('totalPayment').textContent = formatCurrency(results.totalPayment);
    document.getElementById('totalInterest').textContent = formatCurrency(results.totalInterest);
    document.getElementById('loanAmountResult').textContent = formatCurrency(results.loanAmount);
    
    // Breakdown
    document.getElementById('principalInterest').textContent = formatCurrency(results.monthlyPI);
    document.getElementById('propertyTaxMonthly').textContent = formatCurrency(results.monthlyPropertyTax);
    document.getElementById('homeInsuranceMonthly').textContent = formatCurrency(results.monthlyHomeInsurance);
    document.getElementById('hoaFeesResult').textContent = formatCurrency(results.hoaFees);
    document.getElementById('pmiResult').textContent = formatCurrency(results.pmi);
    document.getElementById('totalMonthlyPayment').textContent = formatCurrency(results.monthlyPayment);
}

/**
 * Generate amortization schedule
 */
function generateAmortizationSchedule(principal, monthlyRate, numPayments, monthlyPayment) {
    amortizationData = [];
    let balance = principal;
    const yearsInLoan = numPayments / 12;
    
    for (let year = 1; year <= yearsInLoan; year++) {
        const startBalance = balance;
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        
        // Calculate 12 months for this year
        for (let month = 1; month <= 12; month++) {
            if (balance <= 0) break;
            
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            
            balance -= principalPayment;
            yearlyPrincipal += principalPayment;
            yearlyInterest += interestPayment;
            
            // Prevent negative balance
            if (balance < 0) {
                yearlyPrincipal += balance;
                balance = 0;
            }
        }
        
        const endBalance = balance > 0 ? balance : 0;
        
        amortizationData.push({
            year: year,
            startBalance: startBalance,
            monthlyPayment: monthlyPayment,
            totalPaid: monthlyPayment * 12,
            principalPaid: yearlyPrincipal,
            interestPaid: yearlyInterest,
            endBalance: endBalance
        });
        
        if (balance <= 0) break;
    }
    
    // Display in table
    displayAmortizationTable();
}

/**
 * Display amortization schedule in table
 */
function displayAmortizationTable() {
    const tbody = document.getElementById('amortizationBody');
    tbody.innerHTML = '';
    
    amortizationData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.year}</td>
            <td>${formatCurrency(row.startBalance)}</td>
            <td>${formatCurrency(row.monthlyPayment)}</td>
            <td>${formatCurrency(row.totalPaid)}</td>
            <td>${formatCurrency(row.principalPaid)}</td>
            <td>${formatCurrency(row.interestPaid)}</td>
            <td>${formatCurrency(row.endBalance)}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Create chart visualization
 */
function createChart() {
    const canvas = document.getElementById('paymentChart');
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if exists
    if (chartInstance) {
        chartInstance = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Prepare data for chart
    const years = amortizationData.map(d => `Year ${d.year}`);
    const principalData = amortizationData.map(d => d.principalPaid);
    const interestData = amortizationData.map(d => d.interestPaid);
    
    // Simple canvas-based chart (since we're avoiding external libraries)
    drawBarChart(ctx, canvas, years, principalData, interestData);
}

/**
 * Draw a simple bar chart using canvas
 */
function drawBarChart(ctx, canvas, labels, principalData, interestData) {
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find max value
    const maxValue = Math.max(...principalData.map((p, i) => p + interestData[i]));
    
    // Draw bars
    const barWidth = chartWidth / labels.length;
    const gap = barWidth * 0.2;
    const actualBarWidth = barWidth - gap;
    
    labels.forEach((label, index) => {
        const x = padding + (index * barWidth);
        const principalHeight = (principalData[index] / maxValue) * chartHeight;
        const interestHeight = (interestData[index] / maxValue) * chartHeight;
        
        // Draw interest bar (bottom)
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(x + gap/2, padding + chartHeight - interestHeight, actualBarWidth, interestHeight);
        
        // Draw principal bar (top)
        ctx.fillStyle = '#3498db';
        ctx.fillRect(x + gap/2, padding + chartHeight - interestHeight - principalHeight, actualBarWidth, principalHeight);
    });
    
    // Draw axes
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();
    
    // Draw labels (sample every few years for readability)
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const labelInterval = Math.ceil(labels.length / 10);
    labels.forEach((label, index) => {
        if (index % labelInterval === 0 || index === labels.length - 1) {
            const x = padding + (index * barWidth) + actualBarWidth / 2;
            ctx.fillText(label.replace('Year ', ''), x, padding + chartHeight + 20);
        }
    });
    
    // Draw Y-axis labels
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(maxValue), padding - 10, padding + 5);
    ctx.fillText(formatCurrency(maxValue / 2), padding - 10, padding + chartHeight / 2);
    ctx.fillText('$0', padding - 10, padding + chartHeight + 5);
    
    // Draw legend
    const legendY = 20;
    ctx.fillStyle = '#3498db';
    ctx.fillRect(width - 150, legendY, 20, 20);
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'left';
    ctx.fillText('Principal', width - 125, legendY + 15);
    
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(width - 150, legendY + 30, 20, 20);
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('Interest', width - 125, legendY + 45);
    
    // Chart title
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Annual Principal & Interest Payments', width / 2, 30);
}

/**
 * Format number as currency
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Reset form to defaults
 */
function resetForm() {
    document.getElementById('mortgageForm').reset();
    
    // Reset to default values
    document.getElementById('homePrice').value = 300000;
    document.getElementById('homePriceSlider').value = 300000;
    document.getElementById('downPayment').value = 60000;
    document.getElementById('downPaymentPercent').value = 20;
    document.getElementById('interestRate').value = 6.5;
    document.getElementById('interestRateSlider').value = 6.5;
    document.getElementById('loanTerm').value = 30;
    document.getElementById('propertyTax').value = 3600;
    document.getElementById('homeInsurance').value = 1200;
    document.getElementById('hoaFees').value = 0;
    document.getElementById('pmi').value = 0;
    
    updateLoanAmount();
    
    // Hide results
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('show');
    
    // Clear local storage
    localStorage.removeItem('mortgageCalculatorData');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Save data to local storage
 */
function saveData() {
    const data = {
        homePrice: document.getElementById('homePrice').value,
        downPayment: document.getElementById('downPayment').value,
        downPaymentPercent: document.getElementById('downPaymentPercent').value,
        interestRate: document.getElementById('interestRate').value,
        loanTerm: document.getElementById('loanTerm').value,
        propertyTax: document.getElementById('propertyTax').value,
        homeInsurance: document.getElementById('homeInsurance').value,
        hoaFees: document.getElementById('hoaFees').value,
        pmi: document.getElementById('pmi').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('mortgageCalculatorData', JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save to local storage:', e);
    }
}

/**
 * Load saved data from local storage
 */
function loadSavedData() {
    try {
        const savedData = localStorage.getItem('mortgageCalculatorData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Check if data is not too old (within 7 days)
            const savedDate = new Date(data.timestamp);
            const now = new Date();
            const daysDiff = (now - savedDate) / (1000 * 60 * 60 * 24);
            
            if (daysDiff <= 7) {
                // Restore saved values
                document.getElementById('homePrice').value = data.homePrice;
                document.getElementById('homePriceSlider').value = data.homePrice;
                document.getElementById('downPayment').value = data.downPayment;
                document.getElementById('downPaymentPercent').value = data.downPaymentPercent;
                document.getElementById('interestRate').value = data.interestRate;
                document.getElementById('interestRateSlider').value = data.interestRate;
                document.getElementById('loanTerm').value = data.loanTerm;
                document.getElementById('propertyTax').value = data.propertyTax;
                document.getElementById('homeInsurance').value = data.homeInsurance;
                document.getElementById('hoaFees').value = data.hoaFees;
                document.getElementById('pmi').value = data.pmi;
                
                updateLoanAmount();
            }
        }
    } catch (e) {
        console.warn('Could not load from local storage:', e);
    }
}

/**
 * Handle window resize for responsive chart
 */
window.addEventListener('resize', function() {
    if (amortizationData.length > 0) {
        createChart();
    }
});
