import AbstractView from "../framework/view/abstract-view"
import { createElement } from "../render"
import {createRoutePoint} from '../templates/point-template'
export default class RoutePointView extends AbstractView {
  #onEditArrowClick = null
  constructor(point, destination, offers, onEditArrowClick ) {
    super()
    this.point = point
    this.destination = destination
    this.offers = offers
    this.#onEditArrowClick = onEditArrowClick
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickRollupHandler)
  }
  get template() {
    return createRoutePoint(this.point, this.destination, this.offers)
  }
  #clickRollupHandler = (evt) =>
  {
    evt.preventDefault()
    this.#onEditArrowClick();
  }
}
