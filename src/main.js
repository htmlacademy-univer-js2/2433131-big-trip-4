import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';
import EventPresenter from './presenter/event-presenter.js';
import WaypointsModel from './model/waypoint-model.js';
import { getMockFilters } from './mock/filter.js';
import { getMockSorts } from './mock/sort.js';

const mainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');

const mockFilters = getMockFilters();
const mockSorts = getMockSorts();

const waypointsModel = new WaypointsModel();
const eventPresenter = new EventPresenter({eventContainer, waypointsModel, sorts: mockSorts});

render(new InfoView(), mainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView({filters: mockFilters}), filterContainer);

eventPresenter.init();
