const API_SRC = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic awdaf5g34123csdrh56w2r5';

const ACTIONS = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
const DATE_FORMAT_DAY = 'MMM DD';
const DATE_FORMAT_HOURS = 'hh:mm';

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SORTING_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export {
  API_SRC,
  AUTHORIZATION,
  DATE_FORMAT_EDIT,
  DATE_FORMAT_DAY,
  DATE_FORMAT_HOURS,
  FILTER_TYPE,
  SORTING_TYPES,
  ACTIONS,
  UPDATE_TYPE
};
