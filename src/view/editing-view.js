import { createElement } from "../render"
import {createEditTemplate} from "../templates/edit-template.js"
import AbstractView from '../framework/view/abstract-view.js'
export default class EditPointView extends AbstractView {
  #onFormSubitHandler = null
  constructor(point, destination, offers, onFormSubmit) {
    super()
    this.point = point
    this.destination = destination
    this.offers = offers
    this.#onFormSubitHandler = onFormSubmit
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickSubmitHandle)
    this.element.querySelector('form').addEventListener('submit', this.#clickSubmitHandle)
  }
  get template() {
    return createEditTemplate(this.point, this.destination, this.offers)
  }
  #clickSubmitHandle = (evt) =>
  {
    evt.preventDefault()
    this.#onFormSubitHandler()
  }
}
