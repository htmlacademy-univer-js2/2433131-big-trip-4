import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import WaypointPresenter from './waypoint-presenter';

export default class EventPresenter {
  #eventListContainer = new EventListView();
  #waypointPresenters = [];
  #eventContainer;
  #sorts;
  #currentSortType;

  constructor({eventContainer, waypointsModel, sorts}) {
    this.#eventContainer = eventContainer;
    this.#sorts = sorts;
    this.waypoints = waypointsModel.getWaypoints();
    this.#currentSortType = sorts[0].name;
    this.#sortWaypoints(sorts[0].name);
  }

  init() {
    render(new SortView({sorts: this.#sorts, onChange: this.#handleSortTypeChange}), this.#eventContainer);
    render(this.#eventListContainer, this.#eventContainer);
    this.waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  #closeAllEditForms() {
    this.#waypointPresenters.forEach((waypoint) => waypoint.closeForm());
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.waypoints = this.waypoints.map((waypoint) => waypoint.id === updatedWaypoint.id ? updatedWaypoint : waypoint);
    this.#waypointPresenters
      .find((waypointPresenter) => waypointPresenter.id === updatedWaypoint.id)
      .init(updatedWaypoint);
  };

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypoint,
      containerElement: this.#eventContainer,
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
    this.waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  };

  #sortWaypoints(sortType) {
    this.#sorts.find((sort) => sort.name === sortType).getPoints(this.waypoints);
    this.#currentSortType = sortType;
  }

  #deleteWaypoints() {
    this.#waypointPresenters.forEach((waypoint) => waypoint.destroy());
    this.#waypointPresenters = [];
  }
}
