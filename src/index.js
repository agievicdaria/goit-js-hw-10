import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';

import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(e => {
  const trimmedValue = inputRef.value.trim();

  countriesListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
  
  if(trimmedValue !== '') {
      fetchCountries(trimmedValue).then(data => {
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
    return countryTemplate(country)
}).join('')
countriesListRef.innerHTML = markup;
}

function generateCountry(countries) {
  const markup = countries.map(country => {
    return countriesTemplate(country)
  }).join('')
  countryInfoRef.innerHTML = markup;
}