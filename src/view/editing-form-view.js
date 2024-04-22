import { humanizeWaypointDueDate } from '../utils.js';
import { DATE_FORMAT_EDIT, DESTINATIONS, OFFERS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function getEventOffer ({id, title, price, isChecked}) {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
}

function getEventOffers (checkedOffers, type) {
  let result = '';
  for (const offer of OFFERS.find((findOffer) => findOffer.type === type).offers) {
    result += getEventOffer({...offer, isChecked: checkedOffers.includes(offer.id)});
  }
  return result;
}

function getEventOfferType (n) {
  return `
    <div class="event__type-item">
    <input id="event-type-${OFFERS[n].type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${OFFERS[n].type}">
    <label class="event__type-label  event__type-label--${OFFERS[n].type}" for="event-type-${OFFERS[n].type}-1">${OFFERS[n].type}</label>
    </div>
  `;
}

function getEventOfferTypes () {
  let result = '';
  for (let i = 0; i <= OFFERS.length - 1; i++) {
    result += getEventOfferType(i);
  }
  return result;
}

function getDestinations() {
  let result = '';
  for (let i = 0; i <= DESTINATIONS.length - 1; i++) {
    result += `<option value="${DESTINATIONS[i].name}"></option>`;
  }
  return result;
}

function createEditingFormTemplate({type, destination, offers, price, dateFrom, dateTo }) {
  const destinationObject = DESTINATIONS.find((dest) => dest.id === destination);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${getEventOfferTypes()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationObject.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${getDestinations()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeWaypointDueDate(dateFrom, DATE_FORMAT_EDIT)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeWaypointDueDate(dateTo, DATE_FORMAT_EDIT)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            ${getEventOffers(offers, type)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationObject.description}</p>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class EditingFormView extends AbstractView {
  #onFormSubmit;

  constructor({waypoint, onFormSubmit}) {
    super();
    this.editingForm = waypoint;
    this.#onFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEditingFormTemplate(this.editingForm);
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#onFormSubmit();
  };
}
