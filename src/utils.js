import dayjs from 'dayjs';

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

function countDuration (dateFrom, dateTo) {
  return dayjs(dateTo).diff(dateFrom, 'm');
}

function formatDuration(minutes) {
  const days = Math.floor(minutes / 24 / 60);
  const hours = Math.floor(minutes / 60) - (days * 24);
  minutes = minutes - hours * 60 - days * 60 * 24;

  let result = '';
  if(days > 0) {
    result += `${days}D `;
  }
  if(hours > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
}

export { getRandomArrayElement, getRandomArrayElements, humanizeWaypointDueDate, getRandomInt, countDuration, formatDuration};
