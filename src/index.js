import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries, countryInfo, countryList } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');

input.addEventListener('keyup', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  const name = evt.target.value.trim();

  if (!name) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(data => murkupCountry(data))
    .catch(err => console.log(err));
}

function murkupCountry(arr) {
  if (arr.length === 1) {
    countryList.innerHTML = '';
    return (countryInfo.innerHTML = arr
      .map(
        ({
          flags: { svg },
          name: { official },
          capital,
          population,
          languages,
        }) => `<ul>
    <li><h2>
        <img src="${svg}" alt="flag" width="50" height="30" />
        ${official}</h2></li>
    <li><h3>Capital: ${capital}</h3></li>
    <li><h3>Population: ${population}</h3></li>
    <li><h3>Languages: ${Object.values(languages)}</h3></li>
    </ul>`
      )
      .join(''));
  } else if (arr.length > 1 && arr.length < 11) {
    countryInfo.innerHTML = '';
    return (countryList.innerHTML = arr
      .map(
        ({ flags: { svg }, name: { common } }) => `<ul>
        <li><h2>
        <img src="${svg}" alt="flag" width="50" height="30" />
        ${common}</h2></li>`
      )
      .join(''));
  } else if (arr.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

// const fetchCountries = name => {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`
//   ).then(resp => {
//     if (!resp.ok) {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//       countryInfo.innerHTML = '';
//       countryList.innerHTML = '';
//     }
//     return resp.json();
//   });
// };
