import {remove, render, replace} from '../framework/render.js';
import EditingFormView from '../view/editing-form-view.js';
import WaypointView from '../view/waypoint-view.js';

export default class WaypointPresenter {
  #waypoint;
  #waypointComponent;
  #editComponent;
  #closeAllEditForms;
  #onChange;
  #isEdit;
  #containerElement;

  constructor({waypoint, closeAllEditForms, onChange, containerElement}) {
    this.id = waypoint.id;
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
      waypoint: waypoint,
      onEditClick: () => this.openForm(),
      onFavoriteClick: () => this.#handleFavoriteClick()
    });

    this.#editComponent = new EditingFormView({
      waypoint: waypoint,
      onFormSubmit: () => this.closeForm()
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
      replace(this.#waypointComponent, this.#editComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEdit = false;
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.closeForm();
    }
  };

  #handleFavoriteClick = () => {
    this.#onChange({...this.#waypoint, isFavorite: !this.#waypoint.isFavorite});
  };
}
