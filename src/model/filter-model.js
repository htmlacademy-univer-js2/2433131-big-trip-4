import {FILTER_TYPE, UPDATE_TYPE} from '../const';
import Observable from '../framework/observable.js';


export default class FilterModel extends Observable {
  #filter = FILTER_TYPE.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(filter) {
    this.#filter = filter;
    this._notify(UPDATE_TYPE.MAJOR, filter);
  }
}
