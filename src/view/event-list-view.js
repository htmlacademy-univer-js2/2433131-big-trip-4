import AbstractView from '../framework/view/abstract-view.js';

function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventListView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createEventListTemplate();
  }
}
