import AbstractView from '../framework/view/abstract-view.js';

function createInfoTemplate(route, routeDates, totalPrice) {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${routeDates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `;
}

export default class InfoView extends AbstractView {
  #route = null;
  #routeDates = null;
  #totalPrice = null;

  constructor({route, routeDates, totalPrice}) {
    super();
    this.#route = route;
    this.#routeDates = routeDates;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createInfoTemplate(this.#route, this.#routeDates, this.#totalPrice);
  }
}
