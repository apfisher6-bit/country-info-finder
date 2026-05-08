const countryName = document.getElementById('country');
const countryInput = document.getElementById('country-code');
const countryButton = document.getElementById('country-btn');

async function buildCountryCard() {
    const countryQuery = countryInput.value.trim();
    
    const countryCap = document.getElementById('cap-value');
    const countryReg = document.getElementById('reg-value');
    const countryPop = document.getElementById('pop-value');
    const countryMoney = document.getElementById('money-value');
    const countryLang = document.getElementById('lang-value');
    const flagImg = document.getElementById('flag-img');
    
    countryInput.value = '';
    const url = `https://restcountries.com/v3.1/name/${countryQuery}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        countryName.textContent = 'Country not found';
        if (flagImg) {
            flagImg.src = '';
            flagImg.alt = '';
        }
        return;
    };
    
    const data = await response.json();
    const country = data[0];
    
    const currencies = country.currencies;
    const languages = country.languages;
    
    const firstCurrencyKey = Object.keys(currencies)[0];
    const firstCurrency = currencies[firstCurrencyKey];
    
    const firstLanguageKey = Object.keys(languages)[0];
    const firstLanguage = languages[firstLanguageKey];
    
    countryName.textContent = country.name.common;
    countryCap.textContent = country.capital[0];
    countryReg.textContent = country.region;
    countryPop.textContent = country.population;
    countryMoney.textContent = `${firstCurrency.name} (${firstCurrency.symbol})`;
    countryLang.textContent = firstLanguage;
    
    if (flagImg) {
        flagImg.src = country.flags.png;
        flagImg.alt = country.flags.alt || `Flag of ${country.name.common}`;
    }

    console.log(data[0]);
}

countryButton.addEventListener('click', buildCountryCard);