import Notiflix from 'notiflix';
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`
  ).then(resp => {
    if (!resp.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    }
    return resp.json();
  });
};
export { fetchCountries };
