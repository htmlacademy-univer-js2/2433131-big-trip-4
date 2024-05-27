import {remove, render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import WaypointPresenter from './waypoint-presenter';
import {ACTIONS as USER_ACTION, SORTING_TYPES, UPDATE_TYPE} from '../const';
import NewWaypointPresenter from './new-waypoint-presenter';

export default class EventPresenter {
  #eventListContainer = new EventListView();
  #waypointPresenters = [];
  #eventContainer;
  #sorts;
  #filters;
  #currentSortType;
  #emptyComponent;
  #filterModel;
  #newPointPresenter;
  #onNewPointDestroy;

  constructor({eventContainer, waypointsModel, filterModel, sorts, filters, onNewPointDestroy}) {
    this.#eventContainer = eventContainer;
    this.#sorts = sorts;
    this.#filters = filters;
    this.waypointsModel = waypointsModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;
    this.#currentSortType = sorts[0].name;
    this.#sortWaypoints(sorts[0].name);
  }

  init() {
    render(
      new SortView({sorts: this.#sorts, currentSort: this.#currentSortType, onChange: this.#handleSortTypeChange}),
      this.#eventContainer,
      RenderPosition.BEFOREEND
    );
    this.renderWaypoints();
    this.#filterModel.addObserver(this.#handleFilterTypeChange.bind(this));
    this.waypointsModel.addObserver(this.#handleModelEvent);
  }

  createWaypoint() {
    this.#newPointPresenter = new NewWaypointPresenter({
      pointListContainer: this.#eventListContainer.element,
      onDataChange: this.#handleWaypointChange,
      onDestroy: this.#onNewPointDestroy,
      closeAllEditForms: () => this.#closeAllEditForms(),
    });

    this.#newPointPresenter.init();
  }

  renderWaypoints() {
    render(this.#eventListContainer, this.#eventContainer);
    const filteredPoints = this.#getFilteredWaypoints(this.waypointsModel.getWaypoints());
    filteredPoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  reset() {
    this.#waypointPresenters.forEach((waypointPresenter) => waypointPresenter.destroy());
    this.#waypointPresenters = [];

    if (this.#emptyComponent) {
      remove(this.#emptyComponent);
    }
  }

  #closeAllEditForms() {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }

    this.#waypointPresenters.forEach((waypoint) => waypoint.closeForm());
  }

  #handleWaypointChange = (action, type, waypoint) => {
    switch (action) {
      case USER_ACTION.ADD_POINT:
        this.#sortWaypoints(SORTING_TYPES.DAY);
        this.waypointsModel.addPoint(type, waypoint);
        break;
      case USER_ACTION.DELETE_POINT:
        this.waypointsModel.deletePoint(type, waypoint);
        break;
      case USER_ACTION.UPDATE_POINT:
        this.waypointsModel.updatePoint(type, waypoint);
        break;
    }
  };

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypoint,
      containerElement: this.#eventListContainer.element,
      closeAllEditForms: () => this.#closeAllEditForms(),
      onChange: this.#handleWaypointChange
    });
    waypointPresenter.init(waypoint);
    this.#waypointPresenters.push(waypointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#sortWaypoints(sortType);
    this.#deleteWaypoints();
    this.waypointsModel.getWaypoints().forEach((waypoint) => this.#renderWaypoint(waypoint));
  };

  #sortWaypoints(sortType) {
    this.#sorts.find((sort) => sort.name === sortType).getPoints(this.waypointsModel.getWaypoints());
    this.#currentSortType = sortType;
  }

  #getFilteredWaypoints(waypoints) {
    return this.#filters.find((filter) => filter.name === this.#filterModel.filter).getPoints(waypoints);
  }

  #deleteWaypoints() {
    this.#waypointPresenters.forEach((waypoint) => waypoint.destroy());
    this.#waypointPresenters = [];
  }

  #handleFilterTypeChange() {
    this.reset();
    this.#currentSortType = SORTING_TYPES.DAY;
    this.renderWaypoints();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UPDATE_TYPE.MINOR:
        this.reset();
        this.renderWaypoints();
        break;
      case UPDATE_TYPE.MAJOR:
        this.reset();
        this.renderWaypoints();
        this.#currentSortType = SORTING_TYPES.DAY;
        break;
    }
  };
}
