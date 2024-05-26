import {remove, render, replace} from '../framework/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #filterContainer;
  #filters;
  #filterComponent = null;
  #filterModel;

  constructor({filterContainer, filterModel, filters}) {
    this.#filterContainer = filterContainer;
    this.#filters = filters;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.init.bind(this));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.#filters,
      type: this.#filterModel.filter,
      onChange: this.#handleTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

    render(this.#filterComponent, this.#filterContainer);
  }

  #handleTypeChange = (type) => {
    if (this.#filterModel.filter === type) {
      return;
    }

    this.#filterModel.setFilter(type);
  };
}
