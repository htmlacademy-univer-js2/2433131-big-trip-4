import {UPDATE_TYPE} from '../const.js';
import Observable from '../framework/observable';

export default class WaypointsModel extends Observable {
  #waypointsService = null;
  waypoints = [];
  destinations = [];
  offers = [];

  constructor({waypointsService}) {
    super();
    this.#waypointsService = waypointsService;
  }

  getWaypoints() {
    return this.waypoints;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getWaypoint(id) {
    return this.waypoints.find((waypoint) => waypoint.id === id);
  }

  setWaypoints(waypoints) {
    this.waypoints = waypoints;
  }

  setWaypoint(waypoint, id) {
    this.waypoints = [...this.waypoints.filter((other) => other.id !== id), waypoint];
  }

  async init() {
    try {
      const waypoints = await this.#waypointsService.events;
      this.waypoints = waypoints.map(this.#adapter);
      this.destinations = await this.#waypointsService.destinations;
      this.offers = await this.#waypointsService.offers;
    } catch (err) {
      this._notify(UPDATE_TYPE.ERROR);
      this.waypoints = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#waypointsService.addEvent(update);
      const adaptedWaypoint = this.#adapter(response);
      this.waypoints = [adaptedWaypoint, ...this.waypoints];
      this._notify(updateType, adaptedWaypoint);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async updatePoint(updateType, update) {
    const index = this.waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error('The point doesn\'t exist!');
    }

    try {
      const response = await this.#waypointsService.updateEvent(update);
      const adaptedWaypoint = this.#adapter(response);
      this.waypoints = [
        ...this.waypoints.slice(0, index),
        adaptedWaypoint,
        ...this.waypoints.slice(index + 1),
      ];
      this._notify(updateType, adaptedWaypoint);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.waypoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('The point doesn\'t exist!');
    }

    try {
      await this.#waypointsService.deleteEvent(update);
      this.waypoints = [
        ...this.waypoints.slice(0, index),
        ...this.waypoints.slice(index + 1),
      ];

      this._notify(UPDATE_TYPE.MINOR, update);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adapter(waypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      basePrice: waypoint['base_price'],
      dateFrom: waypoint['date_from'],
      dateTo: waypoint['date_to'],
      isFavorite: waypoint['is_favorite'],
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];

    return adaptedWaypoint;
  }
}
