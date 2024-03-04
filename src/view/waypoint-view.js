import { createElement } from '../render.js';
import { countDuration, humanizeWaypointDueDate, formatDuration } from '../utils.js';
import { DATE_FORMAT_DAY, DATE_FORMAT_HOURS, DESTINATIONS, OFFERS } from '../const.js';

function createOffer ({title, price}) {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
}

function createOffers (offers) {
  return Array.from(offers, createOffer);
}

function createWaypointTemplate({type, destination, offers, price, dateFrom, dateTo, isFavorite}) {
  const destinationObject = DESTINATIONS.find((dest) => dest.id === destination);
  const offersObject = OFFERS.find((offer) => offer.type === type).offers.filter((offer) => offers.includes(offer.id));

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `
    <div class="event">
    <time class="event__date" datetime="${dateFrom}">${humanizeWaypointDueDate(dateFrom, DATE_FORMAT_DAY)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationObject.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}}">${humanizeWaypointDueDate(dateFrom, DATE_FORMAT_HOURS)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}}">${humanizeWaypointDueDate(dateTo, DATE_FORMAT_HOURS)}</time>
        </p>
        <p class="event__duration">${formatDuration(countDuration(dateFrom, dateTo))}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffers(offersObject)}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `;
}

export default class WaypointView {
  constructor({waypoint}) {
    this.waypoint = waypoint;
  }

  getTemplate() {
    return createWaypointTemplate(this.waypoint);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
