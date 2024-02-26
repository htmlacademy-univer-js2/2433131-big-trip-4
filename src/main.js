import { render, RenderPosition } from './render.js';
import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';
import EventPresenter from './event-presenter.js';

const mainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');

const eventPresenter = new EventPresenter({ eventContainer });

render(new InfoView(), mainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

eventPresenter.init();
