import dayjs from 'dayjs';
import {FILTER_TYPE, SORTING_TYPES} from './const';

function humanizeWaypointDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
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

function stringToDate(str, format) {
  const normalized = str.replace(/[^a-zA-Z0-9]/g, '-');
  const normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  const formatItems = normalizedFormat.split('-');
  const dateItems = normalized.split('-');

  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yy');
  const hourIndex = formatItems.indexOf('hh');
  const minutesIndex = formatItems.indexOf('ii');
  const secondsIndex = formatItems.indexOf('ss');

  const today = new Date();

  const year = yearIndex > -1 ? parseInt(`20${dateItems[yearIndex]}`, 10) : today.getFullYear();
  const month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
  const day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

  const hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
  const minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
  const second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

  return new Date(year, month, day, hour, minute, second);
}

function isEscape(key) {
  return key === 'Escape' || key === 'Esc';
}

const filters = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.filter((point) => point),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => new Date(point.dateFrom) <= new Date() && new Date() <= new Date(point.dateTo)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => new Date(point.dateTo) < new Date()),
};

const sorts = {
  [SORTING_TYPES.DAY]: (points) => points.sort((pointA, pointB) => new Date(pointA.dateFrom) - new Date(pointB.dateFrom)),
  [SORTING_TYPES.EVENT]: (points) => points,
  [SORTING_TYPES.TIME]: (points) => points.sort((pointA, pointB) => countDuration(pointB.dateFrom, pointB.dateTo) - countDuration(pointA.dateFrom, pointA.dateTo)),
  [SORTING_TYPES.PRICE]: (points) => points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice),
  [SORTING_TYPES.OFFERS]: (points) => points,
};


export {
  humanizeWaypointDueDate,
  countDuration,
  formatDuration,
  stringToDate,
  isEscape,
  filters,
  sorts
};
