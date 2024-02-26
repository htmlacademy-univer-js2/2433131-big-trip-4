import { createElement } from '../render.js';

function createEventListTemplate(items) {
  return `<ul class="trip-events__list">${items
    .map((item) => `<li class="trip-events__item">${item}</li>`)
    .join('')}</ul>`;
}

export default class EventListView {
  constructor({ items }) {
    this.items = items;
  }

  getTemplate() {
    return createEventListTemplate(this.items);
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
