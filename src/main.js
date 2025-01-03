import { DestinationModel } from "./model/destination_model"
import { OfferModel } from "./model/offer_model"
import { PointModel } from "./model/point_model"
import { render, RenderPosition } from "./framework/render"
import FilterView from "./view/filters-view"
import MainHeaderView  from "./view/main-header-view"
import NewPointButtonView from "./view/new-point-button-view"
import TripPresenter from "./presenter/trip-presenter"
import FilterPresenter from "./presenter/filter-presenter"
import { getMockFilters } from "./mocks/filter"
import FilterModel from "./model/filter_model"

let body = document.querySelector("body")
let header = body.querySelector(".page-header__container")
let filter = header.querySelector(".trip-controls__filters")
let mainTrip = header.querySelector(".trip-main")
console.log(filter)
let events = body.querySelector(".trip-events")
let destinationModel = new DestinationModel()
let destinations = destinationModel.all
//console.log(destinations)
let offersModel = new OfferModel()
let offers = offersModel.getOffers()
let filters = getMockFilters()
//console.log("Оферы")
//console.log(offers)
let pointsModel = new PointModel(destinations, offers)
let filterModel = new FilterModel()
let tripPresenter = new TripPresenter({container:events, destinationsModel: destinationModel, pointsModel: pointsModel, offersModel: offersModel, filtersModel: filterModel, onNewPointDestroy: handleNewPointFormClose })
render(new MainHeaderView(), mainTrip, RenderPosition.AFTERBEGIN)
const filterPresenter = new FilterPresenter({
  filterContainer: filter,
  filterModel,
  pointsModel
});
const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
render(newPointButtonComponent, mainTrip, RenderPosition.AFTEREND)
filterPresenter.init()
tripPresenter.init()
