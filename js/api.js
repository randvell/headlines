const isTestMode = true;
const API_URL = 'https://newsapi.org/v2';
const API_KEY = '';

const apiRequest = async (action, options) => {
  let requestUrl = '';
  if (isTestMode) {
    requestUrl = `./js/mock/${action}.json`;
  } else {
    requestUrl = `${API_URL}/action`;
  }

  options.headers ||= [];
  options.headers['Content-Type'] = 'application/json';
  options.headers['X-Api_Key'] = API_KEY;

  const response = await fetch(requestUrl, options);
  const result = await response.json();
  if (!response.ok) {
    const error = result.message || `Ошибка сервера: ${response.statusText}`;
    throw new Error(error);
  }

  return result;
};

export const getHeadlines = async (callback) => {
  const result = await apiRequest('headlines', { method: 'get' });
  if (typeof result.articles === 'undefined') {
    throw new Error('Не обнаружены новости в ответе сервера');
  }

  return callback ? callback(result) : result;
};
