import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditingFormView from '../view/editing-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import {WAYPOINTS_COUNT, EDITING_FORM} from '../const.js';
import {replace} from "../framework/render";

export default class EventPresenter {
  #eventListContainer = new EventListView();

  constructor({eventContainer, waypointsModel}) {
    this.eventContainer = eventContainer;
    this.waypointsModel = waypointsModel;
  }

  init() {
    render(new SortView(), this.eventContainer);
    render(this.#eventListContainer, this.eventContainer);

    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      this.#renderWaypoint(this.waypointsModel.waypoints[i])
    }
  }

  #renderWaypoint(waypoint) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const waypointComponent = new WaypointView({
      waypoint: waypoint,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    })

    const waypointEditComponent = new EditingFormView(
      {
        waypoint: waypoint,
        onFormSubmit: () => {
          replaceFormToPoint();
          document.removeEventListener('keydown', escKeyDownHandler);
        }
      }
    )

    function replacePointToForm() {
      replace(waypointEditComponent, waypointComponent);
    }

    function replaceFormToPoint() {
      replace(waypointComponent, waypointEditComponent);
    }

    render(waypointComponent, this.#eventListContainer.element);
  }
}
