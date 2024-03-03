import { getRandomWaypoint } from '../mock/waypoint.js';
import { WAYPOINTS_COUNT } from '../const.js';

export default class WaypointsModel {
  waypoints = Array.from({length: WAYPOINTS_COUNT}, getRandomWaypoint);

  getWaypoints() {
    return this.waypoints;
  }
}
