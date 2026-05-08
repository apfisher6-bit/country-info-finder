# Country Info Finder 🌍

A small web app that lets users search for a country and see live information like its name, capital, region, population, main currency, and language.  
The app uses the [REST Countries API](https://restcountries.com/) to fetch real-time data.

---

## Features

- Search for a country by name
- Shows:
  - Country name
  - Capital city
  - Region
  - Population
  - Main currency (name + symbol)
  - One language
- Handles errors when a country is not found
- Uses live data from a public API

---

## How It Works (Under the Hood)

1. The user types a country name and clicks the search button (or presses Enter).
2. An event listener runs the `buildCountryCard` function.
3. The function reads the user input and builds the API URL:

   ```js
   const url = `https://restcountries.com/v3.1/name/${countryQuery}`;
   ```

4. It sends an HTTP GET request and waits for the response:

   ```js
   const response = await fetch(url);
   ```

5. It checks if the response was successful using `response.ok`.  
   If not, it shows **"Country not found"** and stops:

   ```js
   if (!response.ok) {
     countryName.textContent = 'Country not found';
     return;
   }
   ```

6. If the response is okay, it converts the raw response into JSON:

   ```js
   const data = await response.json(); // data is an array of country objects
   const country = data[0];           // use the first match
   ```

7. It then pulls out the values it needs from the `country` object and updates the DOM:

   ```js
   countryName.textContent = country.name.common;
   countryCap.textContent = country.capital[0];
   countryReg.textContent = country.region;
   countryPop.textContent = country.population;
   ```

8. For currencies and languages it uses `Object.keys` to get the first entry:

   ```js
   const currencies = country.currencies;
   const languages = country.languages;

   const firstCurrencyKey = Object.keys(currencies)[0];
   const firstCurrency = currencies[firstCurrencyKey];

   const firstLanguageKey = Object.keys(languages)[0];
   const firstLanguage = languages[firstLanguageKey];

   countryMoney.textContent = `${firstCurrency.name} (${firstCurrency.symbol})`;
   countryLang.textContent = firstLanguage;
   ```

---

## Tech Stack

- **HTML** – structure of the page
- **CSS** – basic styling for the country card
- **JavaScript** – app logic, DOM updates, and API calls
- **REST Countries API** – external data source

---

## How to Run the Project

1. Clone or download this repository.
2. Open the project folder in your code editor.
3. Use a local server (for example, the **Live Server** extension in VS Code) to avoid CORS issues.
4. Open the app in your browser.
5. Type a country name and hit search.

---

## Possible Improvements

- Show multiple languages instead of just one
- Format the population with commas (e.g. `63,100,945`)
- Display the country flag image
- Add loading states or spinners
- Improve error messages
# country-info-finder
# country-info-finder
