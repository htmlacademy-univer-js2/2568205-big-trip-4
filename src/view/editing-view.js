import { createElement } from "../render"
import {createEditTemplate} from "../templates/edit-template.js"
import AbstractStatefullView from "../framework/view/abstract-stateful-view.js"
import { DestinationModel } from "../model/destination_model.js"
import { CITIES } from "../mocks/consts.js"
export default class EditPointView extends AbstractStatefullView {
  #onFormSubmitHandler = null
  #onFormCloseHandler = null
  #onDeletePointHandler = null
  #point = null
  #destination = null
  #destinations = null
  #offers = null
  constructor(point, destination, destinations, offers, onFormSubmit, onFormClose, onDelete) {
    super()
    this._setState(EditPointView.parsePointToState({point}))
    this.#destination = destination
    this.#destinations = destinations
    this.#offers = offers
    this.#onFormSubmitHandler = onFormSubmit
    this.#onFormCloseHandler = onFormClose
    this.#onDeletePointHandler = onDelete
    this._restoreHandlers()

  }

  get template() {
    console.log(this._state)
    return createEditTemplate(this._state.point, this.#destinations.find(destination=>destination.id==this._state.point.destinationId), this.#offers)
  }
  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickCloseHandle)
    this.element.querySelector('form').addEventListener('submit', this.#clickSubmitHandle)
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeEventTypeHandler)
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler)
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler)
    this.element.querySelector('.event--edit').addEventListener('reset', this.#editDeleteHandler);
  }
  #changeEventTypeHandler = (evt) => {
    console.log(this._state)
    this.updateElement({point: {...this._state.point,
      type: evt.target.value,
      offers: []
    }})
  }
  #clickSubmitHandle = (evt) =>
  {
    evt.preventDefault()
    this.#onFormSubmitHandler(this._state.point)
  }
  #clickCloseHandle = (evt) =>
  {
    evt.preventDefault()
    this.#onFormCloseHandler()
  }
  #changeDestinationHandler = (evt) =>
  {
    evt.preventDefault()
    console.log(this.#destinations)
   let destination = this.#destinations.find((distination)=> distination.name == evt.target.value).id

    this.updateElement({point: {...this._state.point, destinationId: destination} })
  }
  #changePriceHandler = (evt) =>
  {
    evt.preventDefault()
    this._state.basePrice = evt.target.value
    this.updateElement({point:{...this._state.point, basePrice: this._state.basePrice}}                    )

  }
  #editDeleteHandler = (evt) => {
    evt.preventDefault()
    this.#onDeletePointHandler(EditPointView.parseStateToPoint(this._state))
  }
   static parsePointToState = (point) => (point)
   static parseStateToPoint = (state) => (state)
}
