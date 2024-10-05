// // This script fetches the exchange rate API and converts the currency based on user input.

// Fetch exchange rates from the Node.js server
const baseCurrency = document.getElementById('base');
const conversionCurrency = document.getElementById('conversion');
const amountBase = document.getElementById('amount-base');
const convertedAmountDisplay = document.getElementById('convertedAmount');

let exchangeRates = {};

// Fetch exchange rates from your server
fetch('/api/exchange-rates')
  .then(response => response.json())
  .then(data => {
    exchangeRates = data.conversion_rates;
    populateCurrencies();
  });

// Populate the dropdowns with currencies
function populateCurrencies() {
  const currencies = Object.keys(exchangeRates);
  currencies.forEach(currency => {
    const optionBase = document.createElement('option');
    optionBase.value = currency;
    optionBase.textContent = currency;
    baseCurrency.appendChild(optionBase);

    const optionConversion = document.createElement('option');
    optionConversion.value = currency;
    optionConversion.textContent = currency;
    conversionCurrency.appendChild(optionConversion);
  });
}

// Perform currency conversion
function performConversion() {
  const amount = parseFloat(amountBase.value);
  const fromCurrency = baseCurrency.value;
  const toCurrency = conversionCurrency.value;

  if (!isNaN(amount)) {
    const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    convertedAmountDisplay.textContent = convertedAmount.toFixed(2);
  } else {
    convertedAmountDisplay.textContent = '0';
  }
}

// Add event listeners to perform conversion in real-time
amountBase.addEventListener('input', performConversion);
baseCurrency.addEventListener('change', performConversion);
conversionCurrency.addEventListener('change', performConversion);