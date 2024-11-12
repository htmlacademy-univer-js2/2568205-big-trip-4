import { DestinationModel } from "./model/destination_model"
import { OfferModel } from "./model/offer_model"
import { PointModel } from "./model/point_model"
import BoardPresenter from "./presenter/board-presenter"
import { render, RenderPosition } from "./render"
import FilterView from "./view/filters-view"
import MainTripView from "./view/main-header-view"

let body = document.querySelector("body")
let header = body.querySelector(".page-header__container")
let filter = header.querySelector(".trip-controls__filters")
let mainTrip = header.querySelector(".trip-main")
console.log(filter)
let events = body.querySelector(".trip-events")
let destinationModel = new DestinationModel()
let destinations = destinationModel.getDestination()
//console.log(destinations)
let offersModel = new OfferModel()
let offers = offersModel.getOffers()
//console.log("Оферы")
//console.log(offers)
let pointsModel = new PointModel(destinations, offers)
let boardPresenter = new BoardPresenter({container:events, destinationsModel: destinationModel, pointsModel: pointsModel, offersModel: offersModel})
render(new MainTripView(), mainTrip, RenderPosition.AFTERBEGIN)
render(new FilterView(), filter)
boardPresenter.init()
