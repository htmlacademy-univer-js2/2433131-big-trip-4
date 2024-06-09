import {remove, render, RenderPosition} from '../framework/render.js';
import {ACTIONS as USER_ACTION, UPDATE_TYPE} from '../const';
import EditingFormView from '../view/editing-form-view';
import {isEscape} from '../utils';

export default class NewWaypointPresenter {
  #newWaypointComponent = null;
  #offers;
  #destinations;
  #pointListContainer;
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

  setSavingStatus() {
    this.#newWaypointComponent.updateElement({
      isSaving: true,
    });
  }

  setAbortingStatus() {
    const resetFormState = () => {
      this.#newWaypointComponent.updateElement({
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newWaypointComponent.shake(resetFormState);
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
      onFormSubmit: (newWaypoint) => this.#onSave(newWaypoint),
      onClose: () => this.#onCancel(),
      onDelete: this.#onCancel
    });

    render(this.#newWaypointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy() {
    if (this.#newWaypointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newWaypointComponent);
    this.#newWaypointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onSave = (waypoint) => {
    this.#handleDataChange(USER_ACTION.ADD_POINT, UPDATE_TYPE.MAJOR, {
      ...waypoint,
      isFavorite: false
    });
  };

  #onCancel = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (isEscape(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
