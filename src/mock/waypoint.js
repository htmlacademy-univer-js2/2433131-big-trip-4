import {BOOL, DATES, OFFERS, PRICES, TYPES} from '../const.js';
import {getId, getRandomArrayElement, getRandomArrayElements, getRandomInt} from '../utils.js';

function getMockWaypoint() {
  const type = getRandomArrayElement(TYPES);
  const date = getRandomArrayElement(DATES);
  const offers = OFFERS.find((offer) => offer.type === type).offers.map((offer) => offer.id);
  return {
    type: type,
    price: getRandomArrayElement(PRICES),
    dateFrom: date.from,
    dateTo: date.to,
    destination: `${getRandomInt(4) + 1}`,
    isFavorite: getRandomArrayElement(BOOL),
    offers: getRandomArrayElements(offers, getRandomInt(offers.length)),
  };
}

const mockWaypoints = [
  getMockWaypoint(),
  getMockWaypoint(),
  getMockWaypoint()
];

function getRandomWaypoint() {
  return {
    ...getRandomArrayElement(mockWaypoints),
    id: getId()
  };
}

export {getRandomWaypoint};
