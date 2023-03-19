import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(e => {
  const trimValue = inputRef.value.trim();

  listRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
  
  if(trimValue !== '') {
      fetchCountries(trimValue).then(data => {
          if(data.length > 10) {
              Notify.info("Too many matches found. Please enter a more specific name.")
          } else if(data.length >= 2 && data.length <= 10) {
            generateCountries(data)
          } else if(data.length === 1) {
            generateCountry(data)
          } 
      })
  }
}, DEBOUNCE_DELAY));

function generateCountries(countries) {
  const markup = countries.map(country => {
    return `<li class="country-item">
    <img src="${country.flags.svg}" alt="flag of ${country.name.official}" class="country-img"/>
    <p class="country-name">${country.name.official}</p>
  </li>`
}).join('')
listRef.innerHTML = markup;
}

function generateCountry(countries) {
  const markup = countries.map(country => {
    return `<div class="info-wrapper">
      <img class="info-img" src="${country.flags.svg}" alt="flag of ${country.name.official}">
      <p class="info-name">${country.name.official}</p>
    </div>
    <p class="info-text"><span class="info-text-accent">Capital:</span> ${country.capital}</p>
    <p class="info-text"><span class="info-text-accent">Population:</span> ${country.population}</p>
    <p class="info-text"><span class="info-text-accent">Languages:</span> ${Object.values(country.languages)}</p>`
  }).join('')
  countryInfoRef.innerHTML = markup;
}