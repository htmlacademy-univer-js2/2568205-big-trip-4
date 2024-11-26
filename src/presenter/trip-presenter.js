import { render, replace } from "../framework/render";
import RoutePointView from "../view/route-point-view"
import SortView from "../view/sorting-view"
import MainHeaderView from "../view/main-header-view"
import ListEventsView from "../view/list-events-view"
import EditPointView from "../view/editing-view";
import PointPresenter from "./point-pesenter";
import { updateItem } from "../utils";
export default class TripPresenter {
  sortComponent = new SortView();
  eventListComponent = new ListEventsView();
  points = []
  pointPresenters = new Map()
  constructor({container, destinationsModel, offersModel, pointsModel}){
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.points = pointsModel.points

  }

  init(){
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    this.points.forEach((point) => {
     const presenter = new PointPresenter(this.destinationsModel.getById(point.destinationId),
     this.offersModel.getOfferByType(point.type), this.eventListComponent, this.#handlePointChange, this.#handleModeChange)
     this.pointPresenters.set(point.id, presenter)
     presenter.init(point)
    });
  }
  #handlePointChange = (updatedPoint) => {
    //console.log('изменено')
   this.points = updateItem(this.points, updatedPoint)
    this.pointPresenters.get(updatedPoint.id).init(updatedPoint)
  }
  #handleModeChange = () => {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  };
}

