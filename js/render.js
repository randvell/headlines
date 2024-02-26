import { getHeadlines } from './api.js';

const newsList = document.querySelector('.news');

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

export const renderArticles = ({ articles, limit = 8 }) => {
  if (!articles) {
    return;
  }

  articles.slice(0, limit).forEach((cardData) => {
    newsList.append(createNewsCard(cardData));
  });
};

export const countrySelector = document.querySelector('#country-selector');
countrySelector.addEventListener('change', () => {
  getHeadlines(renderArticles);
});
