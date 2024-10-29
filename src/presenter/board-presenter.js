import { render } from "../render";
import RoutePointView from "../view/route-point-view"
import SortView from "../view/sorting-view"
import MainHeaderView from "../view/main-header-view"
import ListEventsView from "../view/list-events-view"
import EditPointView from "../view/editing-view";
import AddPointView from "../view/add-view";
export default class BoardPresenter {
    constructor({container}) {
      this.sort = new SortView()
      this.events = new ListEventsView()
    this.container = container
  }
  init() {
    render(this.sort, this.container)
    render(this.events, this.container)
    let eventsElement = this.events.getElement()
    render(new EditPointView(), eventsElement)
    render(new AddPointView(), eventsElement)
    let eventsCount = 3
    for (let i=0; i<eventsCount; i++)
    {
      console.log(i)
      render(new RoutePointView(), eventsElement)
    }

  }

}
