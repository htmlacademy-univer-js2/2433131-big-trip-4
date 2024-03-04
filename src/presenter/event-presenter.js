import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditingFormView from '../view/editing-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import { WAYPOINTS_COUNT, EDITING_FORM } from '../const.js';

export default class EventPresenter {
  constructor({ eventContainer, waypointsModel }) {
    this.eventContainer = eventContainer;
    this.waypointsModel = waypointsModel;
    this.itemsOfList = [];
  }

  init() {
    this.itemsOfList.push(new EditingFormView(EDITING_FORM).getTemplate());

    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      this.itemsOfList.push(new WaypointView({waypoint: this.waypointsModel.waypoints[i]}).getTemplate());
    }

    render(new SortView(), this.eventContainer);
    render(new EventListView({ items: this.itemsOfList }), this.eventContainer);
  }
}
