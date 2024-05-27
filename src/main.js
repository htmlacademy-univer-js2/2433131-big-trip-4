import {render, RenderPosition} from './framework/render.js';
import InfoView from './view/info-view.js';
import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoint-model.js';
import {getMockFilters} from './mock/filter.js';
import {getMockSorts} from './mock/sort.js';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonView from './view/new-point-button-view';
import WaypointsService from './service/waypoints-service';
import {API_SRC, AUTHORIZATION} from './const';

const mainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');

const mockFilters = getMockFilters();
const mockSorts = getMockSorts();


const waypointsModel = new WaypointsModel({
  waypointsService: new WaypointsService(API_SRC, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  filters: mockFilters
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

const eventPresenter = new EventPresenter({
  eventContainer,
  waypointsModel,
  filterModel,
  sorts: mockSorts,
  filters: mockFilters,
  onNewPointDestroy: handleNewPointFormClose
});


function handleNewPointButtonClick() {
  eventPresenter.createWaypoint();
  newPointButtonComponent.element.disabled = true;
}


render(new InfoView(), mainContainer, RenderPosition.AFTERBEGIN);
render(newPointButtonComponent, mainContainer, RenderPosition.BEFOREEND);

filterPresenter.init();
eventPresenter.init();
waypointsModel.init();
