import AbstractView from "../framework/view/abstract-view"
import { createElement } from "../render"
function createEventsList() {
  return `<ul class="trip-events__list"></ul>`
}
export default class ListEventsView extends AbstractView {
  constructor() {
    super()
  }
  get template() {
    return createEventsList()
  }

}
