import { 
  ADS_POSITION, 
  ADS_URL, 
  LOADING_TEXT_END, 
  LOADING_TEXT_START 
} from './constants';

export const formatDate = (date) => {
  const currentDate = new Date();
  const givenDate = new Date(date);
  const timeDiff = Math.abs(currentDate.getTime() - givenDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays > 7 ) {
    return givenDate.toDateString();
  } else {
    return `${diffDays} ${diffDays == 1 ? 'day' : 'days'} ago`;
  }
};

export const formatPrice = (price) => `$${(price/100).toFixed(2)}`;

export const formatResponse = (response) => (
  response.data
  .trim()
  .split('\n')
  .map(JSON.parse)
  .reduce((entities, item) => {
    entities.set(item.id, item);
    return entities;
  }, new Map())
);

export const getRandomNumber = () => Math.floor(Math.random()*1000);

export const toMap = (arr, key) => (
  arr.reduce((newMap, item, index) => 
    newMap.set(key ? item[key] : index, item), new Map())
);

export const isCorrectAdPosition = (position) => ((position + 1) % ADS_POSITION) == 0 && position > 0;

export const getAdsUrl = () => `${ADS_URL}${getRandomNumber()}`;

export const getUpdatedLoadingText = (loadingText) => (
  loadingText === LOADING_TEXT_END
    ? LOADING_TEXT_START
    : loadingText + '.'
);
