import {getRandomWaypoint} from '../mock/waypoint.js';
import {UPDATE_TYPE, WAYPOINTS_COUNT} from '../const.js';
import Observable from '../framework/observable';

export default class WaypointsModel extends Observable {
  waypoints = Array.from({length: WAYPOINTS_COUNT}, getRandomWaypoint);

  getWaypoints() {
    return this.waypoints;
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

  addPoint(updateType, update) {
    this.waypoints = [
      update,
      ...this.waypoints,
    ];
    this._notify(updateType, update);
  }

  updatePoint(updateType, update) {
    const index = this.waypoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('The point doesn\'t exist!');
    }

    this.waypoints = [
      ...this.waypoints.slice(0, index),
      update,
      ...this.waypoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.waypoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('The point doesn\'t exist!');
    }

    this.waypoints = [
      ...this.waypoints.slice(0, index),
      ...this.waypoints.slice(index + 1),
    ];

    this._notify(UPDATE_TYPE.MINOR, update);
  }
}
