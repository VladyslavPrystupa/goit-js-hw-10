
import './css/styles.css';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box')

function getCountry(name) {
return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`)
    .then(resp => {
    if (!resp.ok) {
        throw new Error(resp.statusText)
    }

    return resp.json()
    })}


input.addEventListener('keyup', debounce(onInput, DEBOUNCE_DELAY) )

function onInput(evt) {
    evt.preventDefault()
    const name = input.value.trim()
    console.log(getCountry(name).then(data => capital(data)))
   
}   


function capital(data){
    data.map(({name:{official}})=>console.log(official))
}