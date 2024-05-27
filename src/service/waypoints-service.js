import ApiService from '../framework/api-service.js';


export default class WaypointsService extends ApiService {
  get offers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse).catch(() => {
      throw new Error();
    });
  }

  get events() {
    return this._load({url: 'points'}).then(ApiService.parseResponse).catch(() => {
      throw new Error();
    });
  }

  get destinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse).catch(() => {
      throw new Error();
    });
  }

  async addEvent(event) {
    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(this.#adapter(event)),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    return await ApiService.parseResponse(response);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.#adapter(event)),
    });

    return await ApiService.parseResponse(response);
  }

  async deleteEvent(event) {
    return await this._load({
      url: `points/${event.id}`,
      method: 'DELETE',
    });
  }

  #adapter(waypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      ['base_price']: waypoint.basePrice,
      ['date_from']: waypoint.dateFrom,
      ['date_to']: waypoint.dateTo,
      ['is_favorite']: waypoint.isFavorite,
    };

    delete adaptedWaypoint.basePrice;
    delete adaptedWaypoint.dateFrom;
    delete adaptedWaypoint.dateTo;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }
}
