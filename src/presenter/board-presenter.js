import { render } from "../render";
import RoutePointView from "../view/route-point-view"
import SortView from "../view/sorting-view"
import MainHeaderView from "../view/main-header-view"
import ListEventsView from "../view/list-events-view"
import EditPointView from "../view/editing-view";
export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new ListEventsView();
  constructor({container, destinationsModel, offersModel, pointsModel}){
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
  }

  init(){
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    let firstPoint = this.pointsModel.getPoints()[0]
    console.log(this.pointsModel.getPoints())
    render (new EditPointView(
       firstPoint,
       this.destinationsModel.getById(firstPoint.destinationId),
       this.offersModel.getOffers()

    ),
    this.eventListComponent.getElement()
    );
    this.pointsModel.getPoints().forEach((point) => {
      console.log(point)
      render(
        new RoutePointView(
          point,
         this.destinationsModel.getById(point.destinationId),
        this.offersModel.getOfferByType(point.type)
        ),
        this.eventListComponent.getElement()
      );
    });
  }
}

