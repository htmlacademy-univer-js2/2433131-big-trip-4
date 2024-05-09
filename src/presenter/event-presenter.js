import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import WaypointPresenter from './waypoint-presenter';

export default class EventPresenter {
  #eventListContainer = new EventListView();
  #waypointPresenters = [];
  #eventContainer;
  #sorts;

  constructor({eventContainer, waypointsModel, sorts}) {
    this.#eventContainer = eventContainer;
    this.#sorts = sorts;
    this.waypoints = waypointsModel.waypoints;
  }

  init() {
    render(new SortView({sorts: this.#sorts}), this.#eventContainer);
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
}
