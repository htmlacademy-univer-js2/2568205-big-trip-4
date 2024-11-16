import BoardPresenter from "./presenter/board-presenter"
import { render, RenderPosition } from "./render"
import FilterView from "./view/filters-view"
import MainHeaderView from "./view/main-header-view"

let body = document.querySelector("body")
let header = body.querySelector(".page-header__container")
let filter = header.querySelector(".trip-controls__filters")
let mainTrip = header.querySelector(".trip-main")
console.log(filter)
let events = body.querySelector(".trip-events")
let boardPresenter = new BoardPresenter({container:events})
render(new MainHeaderView(), mainTrip, RenderPosition.AFTERBEGIN)
render(new FilterView(), filter)
boardPresenter.init()
