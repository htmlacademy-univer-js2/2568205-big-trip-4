import { createElement } from "../render"
import {createEditTemplate} from "../templates/edit-template.js"
export default class EditPointView {
  constructor(point, destination, offers) {
    this.point = point
    this.destination = destination
    this.offers = offers
  }
  getTemplate() {
    return createEditTemplate(this.point, this.destination, this.offers)
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
