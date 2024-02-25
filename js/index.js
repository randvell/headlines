import { getHeadlines } from './api.js';
import { renderArticles } from './render.js';

const init = async () => {
  getHeadlines(renderArticles);
};

document.addEventListener('DOMContentLoaded', init);
