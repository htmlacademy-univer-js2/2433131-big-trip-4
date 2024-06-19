const API_SRC = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic awdaf5g34123csdrh56w2r51';

const ONE_MINUTE = 60000;
const MAX_EVENTS_LENGTH = 3;

const ACTIONS = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};

const UPDATE_TYPE = {
  INIT: 'INIT',
  ERROR: 'ERROR',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const DATE_FORMAT_EDIT = 'd/m/y H:i';
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

const TIME_LIMITS = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const EVENTS_MESSAGE = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

const FILTER_TYPE_MESSAGE = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

export {
  API_SRC,
  ONE_MINUTE,
  AUTHORIZATION,
  MAX_EVENTS_LENGTH,
  ACTIONS,
  UPDATE_TYPE,
  DATE_FORMAT_EDIT,
  DATE_FORMAT_DAY,
  DATE_FORMAT_HOURS,
  FILTER_TYPE,
  SORTING_TYPES,
  TIME_LIMITS,
  EVENTS_MESSAGE,
  FILTER_TYPE_MESSAGE
};
