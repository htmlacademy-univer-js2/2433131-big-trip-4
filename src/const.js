export const API_SRC = 'https://23.objects.htmlacademy.pro/big-trip';
export const AUTHORIZATION = 'Basic awdaf5g34123csdrh56w2r51';

export const ACTIONS = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};

export const UPDATE_TYPE = {
  INIT: 'INIT',
  ERROR: 'ERROR',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const DATE_FORMAT_EDIT = 'd/m/y H:i';
export const DATE_FORMAT_DAY = 'MMM DD';
export const DATE_FORMAT_HOURS = 'hh:mm';

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SORTING_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const TIME_LIMITS = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const EVENTS_MESSAGE = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

export const FILTER_TYPE_MESSAGE = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};
