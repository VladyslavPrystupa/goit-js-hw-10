import './css/styles.css';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countyInfo = document.querySelector('.country-info');

function getCountry(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

input.addEventListener('keyup', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  const name = evt.target.value.trim();

  if (!name) {
    countyInfo.innerHTML = '';
    return;
  }
  getCountry(name).then(data => countryName(data));
}

function countryName(data) {
  data.map(
    ({
      flags: { svg },
      name: { official },
      capital,
      population,
      languages,
    }) => {
      if (data.length === 1) {
        countyInfo.innerHTML = murkupCountry({
          flags: { svg },
          name: { official },
          capital,
          population,
          languages,
        });
      } else if (data.length < 2 || data.length < 10) {
        console.log(data);
      }
    }
  );
}

function murkupCountry({
  flags: { svg },
  name: { official },
  capital,
  population,
  languages,
}) {
  return `<ul>
    <li><h2>
        <img src="${svg}" alt="flag" width="50" height="30" />
        ${official}</h2></li>
    <li><h3>Capital: ${capital}</h3></li>
    <li><h3>Population: ${population}</h3></li>
    <li><h3>Languages: ${Object.values(languages)}</h3></li>
    </ul>`;
}
