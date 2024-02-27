import { getHeadlines, searchNews } from './api.js';
import { getSearchParam } from './helper.js';
import { renderHeadlines, renderSearch } from './render.js';

const init = async () => {
  if (getSearchParam()) {
    Promise.all([
      searchNews((articles) =>
        renderSearch({ articles: articles.articles, limit: 8 }),
      ),
      getHeadlines(renderHeadlines),
    ]);
  } else {
    getHeadlines(renderHeadlines);
  }
};

document.addEventListener('DOMContentLoaded', init);
