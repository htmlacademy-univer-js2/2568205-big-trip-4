import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filters-view.js';
import { filters } from '../utils.js';
import { FILTER_TYPE } from '../utils.js';
import { UpdateType } from '../utils.js';
export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;
    console.log(Object.keys(filters))
    return Object.keys(filters).map((type) => ({
      type,
      count: filters[type](points).length
    }));
  }

  init() {
    console.log(this.filters)
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(
      filters,
     this.#filterModel.filter,
     this.#handleFilterTypeChange
    );

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
