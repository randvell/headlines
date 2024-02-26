import { getHeadlines, searchNews } from './api.js';
import { getSearchParam } from './helper.js';
import { renderArticles } from './render.js';

const init = async () => {
  if (getSearchParam) {
    searchNews(renderArticles);
  } else {
    getHeadlines(renderArticles);
  }
};

document.addEventListener('DOMContentLoaded', init);
