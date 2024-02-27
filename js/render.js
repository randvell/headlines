import { getHeadlines } from './api.js';
import { getSearchParam } from './helper.js';

const createNewsCard = (cardData) => {
  const dateObject = new Date(cardData.publishedAt);
  const date = dateObject.toISOString().split('T')[0];
  const time = dateObject.toTimeString().split(' ')[0];

  const card = document.createElement('li');
  card.classList.add('news__card', 'card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('card__image-container');

  const img = document.createElement('img');
  img.classList.add('card__image');
  img.src = cardData.urlToImage;

  const preloader = document.createElement('img');
  preloader.classList.add('preloader');
  preloader.src = '../assets/preload.svg';
  imgContainer.append(preloader);

  img.addEventListener('load', () => {
    preloader.remove();
    imgContainer.append(img);
  });

  img.addEventListener('error', () => {
    img.src = '../assets/placeholder.jpeg';
    preloader.remove();
    imgContainer.append(img);
  });

  card.append(imgContainer);

  const linkTitle = document.createElement('a');
  linkTitle.classList.add('card__link', 'card__link--title');
  linkTitle.href = cardData.url;

  const title = document.createElement('p');
  title.classList.add('card__title');
  title.textContent = cardData.title;

  linkTitle.append(title);
  card.append(linkTitle);

  const cardText = document.createElement('p');
  cardText.classList.add('card__text');
  cardText.textContent = cardData.description;

  card.append(cardText);

  const meta = document.createElement('div');
  meta.classList.add('card__meta');
  const metaDate = document.createElement('span');
  metaDate.classList.add('card__date');
  metaDate.textContent = date;
  const metaTime = document.createElement('span');
  metaTime.classList.add('card__time');
  metaTime.textContent = time;
  const metaAuthor = document.createElement('span');
  metaAuthor.classList.add('card__author');
  metaAuthor.textContent = cardData.author;

  meta.append(metaDate, metaTime, metaAuthor);
  card.append(meta);
  return card;
};

const renderArticles = (container, articles, limit = 8) => {
  if (!articles) {
    return;
  }

  articles.slice(0, limit).forEach((cardData) => {
    container.append(createNewsCard(cardData));
  });
};

const createHeadingSection = (title) => {
  const titleSection = document.createElement('div');
  titleSection.classList.add('section');
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('container', 'container--heading');
  const titleEl = document.createElement('h2');
  titleEl.classList.add('page-title');
  titleEl.textContent = title;

  titleContainer.append(titleEl);
  titleSection.append(titleContainer);
  return titleSection;
};

const createArticlesSection = () => {
  const articlesSection = document.createElement('div');
  articlesSection.classList.add('section', 'section--news');
  const container = document.createElement('div');
  container.classList.add('container', 'container--page');
  const newsList = document.createElement('ul');
  newsList.classList.add('news');

  articlesSection.list = newsList;
  container.append(newsList);
  articlesSection.append(container);

  return articlesSection;
};

export const renderSearch = ({ articles, limit = 8 }) => {
  if (!articles) {
    return;
  }

  const main = document.querySelector('main');
  const heading = createHeadingSection('Свежие новости');
  const news = createArticlesSection();
  main.append(heading, news);
  renderArticles(news.list, articles, limit);
};

export const renderHeadlines = ({ articles, limit = 8 }) => {
  if (!articles) {
    return;
  }

  const search = getSearchParam();
  const count = Math.min(limit, articles.length);
  const title = `По вашему запросу "${search}" найдено ${count} результатов`;

  const main = document.querySelector('main');
  const heading = createHeadingSection(title);
  const news = createArticlesSection();
  main.append(heading, news);
  renderArticles(news.list, articles, limit);
};

export const countrySelector = document.querySelector('#country-selector');
countrySelector.addEventListener('change', () => {
  getHeadlines(renderArticles);
});
