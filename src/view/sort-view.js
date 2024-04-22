import AbstractView from '../framework/view/abstract-view.js';

function createSortingItemTemplate(sorting, isChecked) {
  const {name, isDisabled} = sorting;

  return (`
    <div class="trip-sort__item  trip-sort__item--${name}">
        <input id="sort-${name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>
  `);
}

function createSortTemplate(sortingItems) {
  const SORTING_ITEM_TEMPLATE = sortingItems
    .map((sorting, index) => createSortingItemTemplate(sorting, index === 0)) // TODO заменить условие
    .join('');

  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${SORTING_ITEM_TEMPLATE}
    </form>
  `);
}

export default class SortView extends AbstractView {
  #sorts;

  constructor({sorts}) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
