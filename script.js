const form = document.querySelector('form');
const input = document.querySelector('#country-input');
const info = document.querySelector('#country-info');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const country = input.value;
  if (!country) {
    return;
  }
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const countryData = data[0];
    const name = countryData.name.common;
    const capital = countryData.capital[0];
    const population = countryData.population;
    const currency = Object.values(countryData.currencies)[0].name;
    const language = Object.values(countryData.languages);
    const flag = countryData.flags.png;

    info.innerHTML = `
      <h2>${name}</h2>
      <img src="${flag}" alt="${name} flag">
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Currency: ${currency}</p>
      <p>Language: ${language}</p>
    `;
    // info.style.display = 'block';
  } catch (error) {
    console.error(error);
    info.innerHTML = `
      <h2>Country not found</h2>
      <p>Please check the spelling and try again.</p>
    `;
    info.style.display = 'block';
  }
});
