import {remove, render, RenderPosition} from '../framework/render.js';
import {ACTIONS as USER_ACTION, UPDATE_TYPE} from '../const';
import EditingFormView from '../view/editing-form-view';
import {isEscape} from '../utils';

export default class NewWaypointPresenter {
  #offers;
  #destinations;
  #pointListContainer;
  #newWaypointComponent = null;
  #handleDataChange;
  #handleDestroy;
  #closeAllEditForms;

  constructor({offers, destinations, pointListContainer, onDataChange, onDestroy, closeAllEditForms}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointListContainer = pointListContainer;
    this.#closeAllEditForms = closeAllEditForms;
  }

  init() {
    if (this.#newWaypointComponent !== null) {
      return;
    }

    this.#closeAllEditForms();

    this.#newWaypointComponent = new EditingFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      waypoint: {type: 'flight', destination: '', basePrice: 0, offers: [], isFavorite: false},
      onFormSubmit: (newWaypoint) => this.#handleSaveClick(newWaypoint),
      onClose: () => this.#handleCancelClick(),
      onDelete: this.#handleCancelClick
    });

    render(this.#newWaypointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newWaypointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newWaypointComponent);
    this.#newWaypointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleSaveClick = (waypoint) => {
    this.#handleDataChange(USER_ACTION.ADD_POINT, UPDATE_TYPE.MAJOR, {
      ...waypoint,
      isFavorite: false
    });
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
