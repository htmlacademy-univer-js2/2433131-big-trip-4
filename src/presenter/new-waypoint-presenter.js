import {remove, render, RenderPosition} from '../framework/render.js';
import {ACTIONS as USER_ACTION, UPDATE_TYPE} from '../const';
import EditingFormView from '../view/editing-form-view';

export default class NewWaypointPresenter {
  #pointListContainer;
  #newWaypointComponent = null;
  #handleDataChange;
  #handleDestroy;
  #closeAllEditForms;

  constructor({pointListContainer, onDataChange, onDestroy, closeAllEditForms}) {
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
      formType: 'create',
      waypoint: {type: 'flight', destination: '', price: '0', offers: []},
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

  #handleSaveClick = (point) => {
    this.#handleDataChange(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MAJOR,
      {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        ...point
      },
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
