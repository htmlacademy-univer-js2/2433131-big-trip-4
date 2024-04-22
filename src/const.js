const WAYPOINTS_COUNT = 3;

const PRICES = [100, 150, 200];

const DATES = [
  {from: '2019-05-24T23:55:43.845Z', to: '2019-05-24T09:13:25.845Z'},
  {from: '2020-09-05T13:34:15.845Z', to: '2020-09-05T22:05:34.845Z'},
  {from: '2021-03-12T10:21:12.845Z', to: '2021-03-12T12:18:24.845Z'},
  {from: '2022-01-31T19:54:08.845Z', to: '2022-01-31T21:45:19.845Z'},
  {from: '2023-06-17T16:15:14.845Z', to: '2023-06-19T02:06:08.845Z'}
];

const DESTINATIONS = [
  {id: '1', description: 'Description of Moscow', name: 'Moscow', pictures: [{src: 'https://loremflickr.com/248/152?random=1}', description: 'Photo of Moscow'}]},
  {id: '2', description: 'Description of Saint Petersburg', name: 'Saint Petersburg', pictures: [{src: 'https://loremflickr.com/248/152?random=2}', description: 'Photo of Saint Petersburg'}]},
  {id: '3', description: 'Description of Ekaterinburg', name: 'Ekaterinburg', pictures: [{src: 'https://loremflickr.com/248/152?random=3}', description: 'Photo of Ekaterinburg'}]},
  {id: '4', description: 'Description of Sochi', name: 'Sochi', pictures: [{src: 'https://loremflickr.com/248/152?random=4}', description: 'Photo of Sochi'}]},
  {id: '5', description: 'Description of Krasnodar', name: 'Krasnodar', pictures: [{src: 'https://loremflickr.com/248/152?random=5}', description: 'Photo of Krasnodar'}]},
];

const BOOL = [true, false];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {id: '1', title: 'Add luggage', price: '20'},
      {id: '2', title: 'Switch to comfort class', price: '50'},
      {id: '3', title: 'Add water', price: '5'}
    ]
  },
  {
    type: 'bus',
    offers: [
      {id: '1', title: 'Add luggage', price: '40'}
    ]
  },
  {
    type: 'train',
    offers: [
      {id: '1', title: 'Add luggage', price: '70'},
      {id: '2', title: 'Add water', price: '10'},
      {id: '3', title: 'Add meal', price: '20'}
    ]
  },
  {
    type: 'ship',
    offers: [
      {id: '3', title: 'Add meal', price: '25'}
    ]
  },
  {
    type: 'drive',
    offers: [
      {id: '1', title: 'Rent a car', price: '200'},
    ]
  },
  {
    type: 'flight',
    offers: [
      {id: '1', title: 'Add luggage', price: '50'},
      {id: '2', title: 'Switch to comfort class', price: '80'},
      {id: '3', title: 'Add meal', price: '15'},
      {id: '4', title: 'Choose seats', price: '5'},
      {id: '5', title: 'Travel by train', price: '40'}
    ]
  },
  {
    type: 'check-in',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'restaurant',
    offers: []
  },
];

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const EDITING_FORM = {
  type: 'flight',
  price: 160,
  dateFrom: '2019-03-18T12:25:00.845Z',
  dateTo: '2019-03-18T13:35:00.845Z',
  destination: '1',
  isFavorite: false,
  offers: [ '1', '2' ],
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

export { WAYPOINTS_COUNT };
export { PRICES, DATES, BOOL, TYPES };
export { DESTINATIONS };
export { OFFERS };
export { DATE_FORMAT_EDIT, DATE_FORMAT_DAY, DATE_FORMAT_HOURS };
export { EDITING_FORM };
export { FILTER_TYPE, SORTING_TYPES };
