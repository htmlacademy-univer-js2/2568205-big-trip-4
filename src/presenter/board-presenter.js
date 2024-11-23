import { render, replace } from "../framework/render";
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
    this.pointsModel.getPoints().forEach((point) => {
     this.#renderPoint(point)
    });
  }
  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new RoutePointView(
      point,
     this.destinationsModel.getById(point.destinationId),
    this.offersModel.getOfferByType(point.type),
    () => {
      replaceCardToForm()
      document.addEventListener('keydown', escKeyDownHandler)
    }

    )
    const editForm = new EditPointView(
         point,
         this.destinationsModel.getById(point.destinationId),
         this.offersModel.getOffers(), ()=>{
          replaceFormToCard()
         } )
    console.log(point)
    render(
      pointComponent,
      this.eventListComponent.element
    );
    function replaceCardToForm() {
      replace(editForm, pointComponent)
    }
    function replaceFormToCard() {
      replace(pointComponent, editForm)
    }
  }
}

