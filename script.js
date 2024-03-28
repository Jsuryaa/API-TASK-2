
async function fetchCurrencies() {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return data;
}

async function populateCurrencies() {
  const currencies = await fetchCurrencies();
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');

  for (const currency in currencies.rates) {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      fromCurrencySelect.appendChild(option.cloneNode(true));
      toCurrencySelect.appendChild(option);
  }
}

async function convert() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();
  const rate = data.rates[toCurrency];
  const result = amount * rate;

  document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

document.addEventListener('DOMContentLoaded', () => {
  populateCurrencies();
});
