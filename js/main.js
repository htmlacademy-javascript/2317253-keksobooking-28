
const OFFER_TITLES = [
  'Девичье гнездышко',
  'Световая симфония',
  'Яркое отражение индивидуальности',
  'Каждый уголок квартиры освещен светом добра и любви',
  'Штучный экземпляр',
  'Отбросим стереотипы',
];

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const OFFER_CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_DESCRIPTION = [
  'светлое, просторное помещение,',
  'много воздуха и солнца',
  'стены оклеены обоями и покрашены краской',
  'окно высокое трехстворчатое',
  'тюлевые занавески',
  'цветы на подоконнике',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomInteger = (min,max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);

};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min,max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min,max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomAvatarUrl = createRandomIdFromRangeGenerator(1, 10);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createLocation = () => ({
  lat: getRandomInteger ((35.65000 * 100000), (35.70000 * 100000)) / 100000,
  lng: getRandomInteger ((139.70000 * 100000), (139.80000 * 100000)) / 100000,
});

const createAuthor = () => ({
  avatar: `img/avatars/user${createRandomAvatarUrl().toString().padStart(2,'0')}.png`
});

const getAddress = (location) => `${ location.lat } , ${ location.lng }`;

const generateRandomArray = (array) => {
  const getRandomElementIndex = createRandomIdFromRangeGenerator(0, array.length - 1);
  const getRandomElement = () => array[getRandomElementIndex()];
  return Array.from({length: getRandomInteger(0, array.length)}, getRandomElement);
};

const createOffer = (location) => ({
  title: getRandomArrayElement(OFFER_TITLES),
  address: location,
  price: getRandomInteger(20000, 80000),
  type: getRandomArrayElement(OFFER_TYPE),
  rooms: getRandomInteger(1, 4),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(OFFER_CHECK_IN_OUT),
  checkout: getRandomArrayElement(OFFER_CHECK_IN_OUT),
  features: generateRandomArray(OFFER_FEATURES),
  description: getRandomArrayElement(OFFER_DESCRIPTION),
  photos: generateRandomArray(OFFER_PHOTOS),
});

const createPoster = () => {
  const poster = {
    author: createAuthor(),
    location: createLocation(),
  };

  poster.offer = createOffer(getAddress(poster.location));

  return poster;
};

const simularPosters = (count) => Array.from({length: count}, createPoster);

export {simularPosters};
