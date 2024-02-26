import { countrySelector } from './render.js';

export const objectToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

export const getCountryParam = () => countrySelector.value;

export const getSearchParam = () =>
  new URLSearchParams(window.location.search).get('q');
