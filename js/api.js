import {
  getCountryParam,
  getSearchParam,
  objectToQueryString,
} from './helper.js';

const isTestMode = true;
const API_URL = 'https://newsapi.org/v2';
const API_KEY = 'b4b5a2b5ec514a828611e4f8b96d179c';

const apiRequest = async ({ action, query, options }) => {
  let requestUrl = '';
  if (isTestMode) {
    requestUrl = `./js/mock/${action}.json`;
  } else {
    requestUrl = `${API_URL}/${action}`;
  }

  if (query) {
    requestUrl += '?' + objectToQueryString(query);
  }

  options.headers ||= {};
  options.headers['Content-Type'] = 'application/json';
  options.headers['X-Api-Key'] = API_KEY;

  const response = await fetch(requestUrl, options);
  const result = await response.json();
  if (!response.ok) {
    const error = result.message || `Ошибка сервера: ${response.statusText}`;
    throw new Error(error);
  }

  return result;
};

export const getHeadlines = async (callback) => {
  const requestObj = {
    action: 'headlines',
    query: {},
    options: { method: 'get' },
  };

  const country = getCountryParam();
  if (country) {
    requestObj.query.country = country;
  }

  const result = await apiRequest(requestObj);

  if (typeof result.articles === 'undefined') {
    throw new Error('Не обнаружены новости в ответе сервера');
  }

  return callback ? callback(result) : result;
};

export const searchNews = async (callback) => {
  const requestObj = {
    action: 'everything',
    query: {},
    options: { method: 'get' },
  };

  const q = getSearchParam();
  if (q) {
    requestObj.query.q = q;
  }

  const result = await apiRequest(requestObj);

  if (typeof result.articles === 'undefined') {
    throw new Error('Не обнаружены новости в ответе сервера');
  }

  return callback ? callback(result) : result;
};
