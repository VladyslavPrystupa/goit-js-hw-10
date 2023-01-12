import Notiflix from 'notiflix';

const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return resp.json();
  });
};
export { fetchCountries };
