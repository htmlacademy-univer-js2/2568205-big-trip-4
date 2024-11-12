import { createElement } from "../render"
import {createRoutePoint} from '../templates/point-template'
export default class RoutePointView {
  constructor(point, destination, offers ) {
    this.point = point
    this.destination = destination
    this.offers = offers
  }
  getTemplate() {
    return createRoutePoint(this.point, this.destination, this.offers)
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate())
    }
    return this.element
  }
  removeElement() {
    this.element = null
  }
}
