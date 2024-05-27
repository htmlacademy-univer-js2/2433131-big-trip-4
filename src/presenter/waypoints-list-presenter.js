import {remove, render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import WaypointPresenter from './waypoint-presenter';
import {
  ACTIONS as USER_ACTION,
  EVENTS_MESSAGE,
  FILTER_TYPE_MESSAGE,
  SORTING_TYPES,
  TIME_LIMITS,
  UPDATE_TYPE
} from '../const';
import NewWaypointPresenter from './new-waypoint-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export default class WaypointsListPresenter {
  #eventListContainer = new EventListView();
  #waypointPresenters = [];
  #eventContainer;
  #sorts;
  #filters;
  #currentSortType;
  #emptyComponent;
  #filterModel;
  #sortsComponent;
  #newPointPresenter;
  #onNewPointDestroy;
  #messageComponent;

  #isLoading = true;
  #isError = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMITS.LOWER_LIMIT,
    upperLimit: TIME_LIMITS.UPPER_LIMIT
  });

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
    this.renderWaypoints();
    this.#filterModel.addObserver(this.#handleFilterTypeChange.bind(this));
    this.waypointsModel.addObserver(this.#handleModelEvent);
  }

  createWaypoint() {
    this.#newPointPresenter = new NewWaypointPresenter({
      destinations: this.waypointsModel.getDestinations(),
      offers: this.waypointsModel.getOffers(),
      pointListContainer: this.#eventListContainer.element,
      onDataChange: this.#handleWaypointChange,
      onDestroy: this.#onNewPointDestroy,
      closeAllEditForms: () => this.#closeAllEditForms(),
    });

    this.#newPointPresenter.init();
  }

  renderWaypoints() {
    render(this.#eventListContainer, this.#eventContainer);

    if (this.#isError) {
      this.#renderNoWaypoints(EVENTS_MESSAGE.ERROR);
      return;
    }

    if (this.#isLoading) {
      this.#renderNoWaypoints(EVENTS_MESSAGE.LOADING);
      return;
    }

    const filteredPoints = this.#getFilteredWaypoints(this.waypointsModel.getWaypoints());

    if (!filteredPoints.length) {
      this.#renderNoWaypoints(
        FILTER_TYPE_MESSAGE[Object.keys(FILTER_TYPE_MESSAGE).find((key) => key.toUpperCase() === this.#filterModel.filter.toUpperCase())]
      );
      return;
    }

    this.#sortsComponent = new SortView({
      sorts: this.#sorts,
      currentSort: this.#currentSortType,
      onChange: this.#handleSortTypeChange
    });

    render(
      this.#sortsComponent,
      this.#eventContainer,
      RenderPosition.AFTERBEGIN
    );

    filteredPoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  reset() {
    this.#waypointPresenters.forEach((waypointPresenter) => waypointPresenter.destroy());
    this.#waypointPresenters = [];

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }

    if (this.#sortsComponent) {
      remove(this.#sortsComponent);
    }

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

  #handleWaypointChange = async (action, type, waypoint) => {
    this.#uiBlocker.block();
    switch (action) {
      case USER_ACTION.ADD_POINT:
        this.#newPointPresenter.setSavingStatus();
        this.#sortWaypoints(SORTING_TYPES.DAY);
        try {
          await this.waypointsModel.addPoint(type, waypoint);
        } catch (err) {
          this.#newPointPresenter.setAbortingStatus();
        }
        break;
      case USER_ACTION.DELETE_POINT:
        this.#waypointPresenters.find((presenter) => presenter.id === waypoint.id).setDeletingStatus();
        try {
          await this.waypointsModel.deletePoint(type, waypoint);
        } catch (err) {
          this.#waypointPresenters.find((presenter) => presenter.id === waypoint.id).setAbortingStatus();
        }
        break;
      case USER_ACTION.UPDATE_POINT:
        this.#waypointPresenters.find((presenter) => presenter.id === waypoint.id).setSavingStatus();
        try {
          await this.waypointsModel.updatePoint(type, waypoint);
        } catch (err) {
          this.#waypointPresenters.find((presenter) => presenter.id === waypoint.id).setAbortingStatus();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypoint,
      destinations: this.waypointsModel.getDestinations(),
      offers: this.waypointsModel.getOffers(),
      containerElement: this.#eventListContainer.element,
      closeAllEditForms: () => this.#closeAllEditForms(),
      onChange: this.#handleWaypointChange
    });
    waypointPresenter.init(waypoint);
    this.#waypointPresenters.push(waypointPresenter);
  }

  #renderNoWaypoints(message) {
    this.#messageComponent = new LoadingView(message);
    render(
      this.#messageComponent,
      this.#eventContainer,
      RenderPosition.AFTEREND
    );
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

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#waypointPresenters.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.reset();
        this.renderWaypoints();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#currentSortType = SORTING_TYPES.DAY;
        this.reset();
        this.renderWaypoints();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#messageComponent);
        this.init();
        break;
      case UPDATE_TYPE.ERROR:
        this.#isError = true;
        remove(this.#messageComponent);
        break;
    }
  };
}
