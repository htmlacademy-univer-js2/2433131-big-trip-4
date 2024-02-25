import { render } from './render.js';
import SortView from './view/sort-view.js';
import EventListView from './view/event-list-view.js';
import EditingFormView from './view/editing-form-view.js';
import WaypointView from './view/waypoint-view.js';

export default class EventPresenter {
  constructor({ eventContainer }) {
    this.eventContainer = eventContainer;
  }

  init() {
    this.itemsOfList = [new EditingFormView().getTemplate(), new WaypointView().getTemplate(), new WaypointView().getTemplate(), new WaypointView().getTemplate()];
    render(new SortView(), this.eventContainer);
    render(
      new EventListView({ items: this.itemsOfList }),
      this.eventContainer
    );
  }
}
