// This script fetches the exchange rate API and converts the currency based on user input.

// Fetching the exchange rate API
const EXCHANGE_URL = 'https://v6.exchangerate-api.com/v6/66432a0d445cae7f966bdabe/latest/USD';

// Selectors for HTML elements
const currencyBase = document.getElementById('base');
const currencyConversion = document.getElementById('conversion');
const amountBase = document.getElementById('amount-base');  // Assuming this is the input for base amount
const amountConversion = document.getElementById('convertedAmount');  // Display area for converted amount

let conversionRates = {};

// Function to populate the dropdowns and store conversion rates
fetch(EXCHANGE_URL)
    .then(response => response.json())
    .then(data => {
        conversionRates = data.conversion_rates;

        const currencyOptions = Object.keys(conversionRates);
        currencyOptions.forEach(currency => {
            const optionBase = document.createElement('option');
            optionBase.value = currency;
            optionBase.innerText = currency;
            currencyBase.appendChild(optionBase);

            const optionConversion = document.createElement('option');
            optionConversion.value = currency;
            optionConversion.innerText = currency;
            currencyConversion.appendChild(optionConversion);
        });

        // Set default values for select elements
        currencyBase.value = 'USD';  // Default base currency
        currencyConversion.value = 'EUR';  // Default conversion currency

        // Perform initial conversion with defaults
        performConversion();
    });

// Function to perform the currency conversion
function performConversion() {
    const baseCurrency = currencyBase.value;
    const targetCurrency = currencyConversion.value;
    const amount = parseFloat(amountBase.value);

    if (isNaN(amount)) {
        amountConversion.innerText = '0';  // Reset converted amount if input is not a valid number
        return;
    }

    // Get the conversion rate
    const baseToUSD = conversionRates[baseCurrency];
    const targetToUSD = conversionRates[targetCurrency];

    // Calculate the converted amount
    const convertedAmount = (amount / baseToUSD) * targetToUSD;

    // Display the converted amount
    amountConversion.innerText = "$"+ convertedAmount.toFixed(2);
}

// Event listeners for real-time conversion
currencyBase.addEventListener('change', performConversion);
currencyConversion.addEventListener('change', performConversion);
amountBase.addEventListener('input', performConversion);