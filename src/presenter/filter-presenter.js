import {remove, render, replace} from '../framework/render';
import FilterView from '../view/filter-view';
import {FILTER_TYPE} from '../const';

export default class FilterPresenter {
  #filterContainer;
  #filters;
  #filterComponent = null;
  #filterModel;
  #waypointsModel;
  #waypoints = null;

  constructor({filterContainer, filterModel, waypointsModel, filters}) {
    this.#filterContainer = filterContainer;
    this.#filters = filters;
    this.#filterModel = filterModel;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.init.bind(this));
    this.#filterModel.addObserver(this.init.bind(this));
  }

  get filters() {
    return Object.values(FILTER_TYPE).map((name) => ({
      name,
      count: this.#filters.find((filter) => filter.name.toUpperCase() === name.toUpperCase()).getPoints(this.#waypoints).length,
    }));
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.getWaypoints()];
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.filters,
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
