import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const {name} = filter;
  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `);
}

function createFilterTemplate(filters, type) {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, type === filter.name))
    .join('');

  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
}

export default class FilterView extends AbstractView {
  #filters;
  #type;
  #handleTypeChange;

  constructor({filters, type, onChange}) {
    super();
    this.#filters = filters;
    this.#type = type;
    this.#handleTypeChange = onChange;

    this.element.addEventListener('click', this.#typeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#type);
  }

  #typeChangeHandler = (event) => {
    if (event.target.classList.contains('trip-filters__filter-input')) {
      this.#handleTypeChange(event.target.value);
    }
  };
}
