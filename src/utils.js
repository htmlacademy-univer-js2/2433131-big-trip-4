import dayjs from 'dayjs';
import { FILTER_TYPE, SORTING_TYPES } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArrayElements(items, n) {
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n).sort();
}

function humanizeWaypointDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function countDuration(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dateFrom, 'm');
}

function formatDuration(minutes) {
  const days = Math.floor(minutes / 24 / 60);
  const hours = Math.floor(minutes / 60) - (days * 24);
  minutes = minutes - hours * 60 - days * 60 * 24;

  let result = '';
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
}

const filters = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.filter((point) => point),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => point),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => point),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => point),
};

const sorts = {
  [SORTING_TYPES.DAY]: (points) => points.filter((point) => point),
  [SORTING_TYPES.EVENT]: (points) => points.filter((point) => point),
  [SORTING_TYPES.TIME]: (points) => points.filter((point) => point),
  [SORTING_TYPES.PRICE]: (points) => points.filter((point) => point),
  [SORTING_TYPES.OFFERS]: (points) => points.filter((point) => point),
};


export {
  getRandomArrayElement,
  getRandomArrayElements,
  humanizeWaypointDueDate,
  getRandomInt,
  countDuration,
  formatDuration
};
export { filters, sorts };
