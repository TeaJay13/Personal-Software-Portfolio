// Select elements from the HTML
const baseCurrency = document.getElementById('base');
const conversionCurrency = document.getElementById('conversion');
const amountBase = document.getElementById('amount-base');
const convertedAmountDisplay = document.getElementById('convertedAmount');
const resetButton = document.getElementById('reset-button');  // Added reset button

// Variable to hold exchange rates
let exchangeRates = {};

// Fetch exchange rates from the server with error handling
fetch('/api/exchange-rates')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    return response.json();
  })
  .then(data => {
    exchangeRates = data.conversion_rates;
    populateCurrencies();
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
    alert('Unable to fetch exchange rates. Please try again later.');
  });

// Populate dropdowns with currency options
function populateCurrencies() {
  const currencies = Object.keys(exchangeRates);
  currencies.forEach(currency => {
    addOption(baseCurrency, currency);
    addOption(conversionCurrency, currency);
  });
}

// Helper function to add an option to a dropdown
function addOption(selectElement, currency) {
  const option = document.createElement('option');
  option.value = currency;
  option.textContent = currency;
  selectElement.appendChild(option);
}

// Convert currency based on user input
function performConversion() {
  const amount = parseFloat(amountBase.value);
  const fromCurrency = baseCurrency.value;
  const toCurrency = conversionCurrency.value;

  if (validateInput(amount, fromCurrency, toCurrency)) {
    const convertedAmount = calculateConversion(amount, fromCurrency, toCurrency);
    updateConvertedAmountDisplay(convertedAmount);
  } else {
    updateConvertedAmountDisplay(0);
  }
}

// Validate user input (amount and currency selections)
function validateInput(amount, fromCurrency, toCurrency) {
  return !isNaN(amount) && fromCurrency && toCurrency;
}

// Perform the actual conversion calculation
function calculateConversion(amount, fromCurrency, toCurrency) {
  return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
}

// Update the display of the converted amount
function updateConvertedAmountDisplay(amount) {
  convertedAmountDisplay.textContent = amount.toFixed(2);
}

// Reset the input fields and the result
function resetFields() {
  amountBase.value = '';
  baseCurrency.value = '';
  conversionCurrency.value = '';
  convertedAmountDisplay.textContent = '0';
}

// Event listeners for input changes
amountBase.addEventListener('input', performConversion);
baseCurrency.addEventListener('change', performConversion);
conversionCurrency.addEventListener('change', performConversion);
resetButton.addEventListener('click', resetFields);  // Listener for reset button
