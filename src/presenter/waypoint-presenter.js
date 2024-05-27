import {remove, render, replace} from '../framework/render.js';
import EditingFormView from '../view/editing-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import {ACTIONS as USER_ACTION, UPDATE_TYPE} from '../const';
import {isEscape} from '../utils';

export default class WaypointPresenter {
  #destinations;
  #offers;
  #waypoint;
  #waypointComponent;
  #editComponent;
  #closeAllEditForms;
  #onChange;
  #isEdit;
  #containerElement;

  constructor({destinations, offers, waypoint, closeAllEditForms, onChange, containerElement}) {
    this.id = waypoint.id;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#waypoint = waypoint;
    this.#closeAllEditForms = closeAllEditForms;
    this.#onChange = onChange;
    this.#isEdit = false;
    this.#containerElement = containerElement;

    this.init(this.#waypoint);
  }

  init(waypoint) {
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointComponent;
    const prevEditComponent = this.#editComponent;

    this.#waypointComponent = new WaypointView({
      destinations: this.#destinations,
      offers: this.#offers,
      waypoint: waypoint,
      onEditClick: () => this.openForm(),
      onFavoriteClick: () => this.#handleFavoriteClick()
    });

    this.#editComponent = new EditingFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      waypoint: waypoint,
      onFormSubmit: (newWaypoint) => this.#handleSaveClick(newWaypoint),
      onClose: () => this.closeForm(),
      onDelete: this.#handleDeleteClick
    });

    if (!prevWaypointComponent || !prevEditComponent) {
      render(this.#waypointComponent, this.#containerElement);
      return;
    }

    if (this.#isEdit) {
      replace(this.#editComponent, prevEditComponent);
    } else {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    remove(prevWaypointComponent);
    remove(prevEditComponent);
  }

  openForm() {
    this.#closeAllEditForms();
    replace(this.#editComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isEdit = true;
  }

  closeForm() {
    if (this.#isEdit) {
      this.#editComponent.reset(this.#waypoint);
      replace(this.#waypointComponent, this.#editComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEdit = false;
    }
  }

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt.key)) {
      evt.preventDefault();
      this.#editComponent.reset(this.#waypoint);
      this.closeForm();
    }
  };

  #handleFavoriteClick = () => {
    this.#onChange(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      {...this.#waypoint, isFavorite: !this.#waypoint.isFavorite}
    );
  };

  #handleSaveClick = (waypoint) => {
    this.#onChange(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      waypoint
    );
    this.closeForm();
  };

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editComponent);
  }

  #handleDeleteClick = (point) => {
    this.#onChange(
      USER_ACTION.DELETE_POINT,
      UPDATE_TYPE.MINOR,
      point,
    );
  };
}
