import AbstractView from "../framework/view/abstract-view"
import { createElement } from "../render"
import {createRoutePoint} from '../templates/point-template'
export default class RoutePointView extends AbstractView {
  #onEditArrowClick = null
  #handleFavoriteClick = null
  constructor(point, destination, offers, onEditArrowClick, onFavouriteClick ) {
    super()
    this.point = point
    this.destination = destination
    this.offers = offers
    this.#onEditArrowClick = onEditArrowClick
    this.#handleFavoriteClick = onFavouriteClick
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickRollupHandler)
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#clickFavoriteHandler)
  }
  get template() {
    return createRoutePoint(this.point, this.destination, this.offers)
  }
  #clickRollupHandler = (evt) =>
  {
    evt.preventDefault()
    this.#onEditArrowClick();
  }
  #clickFavoriteHandler = (evt) =>
  {
    evt.preventDefault()
    this.#handleFavoriteClick()
  }
}
