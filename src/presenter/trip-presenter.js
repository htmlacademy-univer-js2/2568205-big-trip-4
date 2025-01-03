import { render, replace, remove } from "../framework/render";
import RoutePointView from "../view/route-point-view"
import SortView from "../view/sorting-view"
import MainHeaderView from "../view/main-header-view"
import ListEventsView from "../view/list-events-view"
import EditPointView from "../view/editing-view";
import PointPresenter from "./point-pesenter";
import NewPointPresenter from "./new-point-presenter";
import { UpdateType, UserAction } from "../utils";
import { getMockSorts } from "../mocks/sort";
import { SORTING_TYPES, sortByDay, sortByOffers, sortByPrice, sortByTime } from "../utils";
import { filters } from "../utils";
export default class TripPresenter {

  eventListComponent = new ListEventsView();
  #pointPresenters = new Map()
  #pointsModel = null

  #filterType = null
  #filtersModel = null
  #currentSortType = null
  #destinationsModel = null
  #offersModel = null
  #sortComponent = null
  #newPointPresenter
  constructor({container, destinationsModel, offersModel, pointsModel, filtersModel, onNewPointDestroy}){
    this.container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel
    this.#filtersModel = filtersModel
    this.#newPointPresenter = new NewPointPresenter(
    this.eventListComponent,
     this.#destinationsModel,
      this.#offersModel,
      this.#userActionHandler,
    onNewPointDestroy
    );

    this.#pointsModel.addObserver(this.#handleModelPoint)
    this.#filtersModel.addObserver(this.#handleModelPoint)

  }
  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filters[this.#filterType](points);
    const sortedPoints = [...filteredPoints];
    switch (this.#currentSortType) {
      case SORTING_TYPES.DAY:
        sortedPoints.sort(sortByDay);
        break;
      case SORTING_TYPES.EVENT:
        sortedPoints.sort(sortByEvent);
        break;
      case SORTING_TYPES.OFFERS:
        sortedPoints.sort(sortByOffers);
        break
      case SORTING_TYPES.PRICE:
        sortedPoints.sort(sortByPrice)
        break;
        case SORTING_TYPES.TIME:
          sortedPoints.sort(sortByTime)
    }
    console.log(sortedPoints)
    return sortedPoints;
  }
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTrip({});
    this.init()
  };
  #clearTrip({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);


    if (resetSortType) {
      this.#currentSortType = SORTING_TYPES.DAY;
    }
  }
  #renderSortView() {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView(
      getMockSorts(),
      this.#currentSortType,
       this.#handleSortTypeChange,

  );

    render(this.#sortComponent, this.container);
  }
  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.init();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.init();
        break;
    }
  };
  createPoint() {
    this.#currentSortType = SORTING_TYPES.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, 'everything');
    this.#newPointPresenter.init();
  }
  init(){
    this.#renderSortView()
    render(this.eventListComponent, this.container);
    console.log(this.points)
    this.points.forEach((point) => {
     const presenter = new PointPresenter(this.#destinationsModel.getById(point.destinationId),
     this.#destinationsModel.all,
     this.#offersModel.getOfferByType(point.type), this.eventListComponent, this.#userActionHandler, this.#handleModeChange)
     this.#pointPresenters.set(point.id, presenter)
     presenter.init(point)
    });



  }
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
  #userActionHandler = (actionType, updateType, update) =>{
    console.log(actionType)
    switch(actionType){
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        console.log('create')
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
}
}
