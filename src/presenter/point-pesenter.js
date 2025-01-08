import RoutePointView from "../view/route-point-view";
import EditPointView from "../view/editing-view";
import { render, replace, remove } from "../framework/render";
import { UpdateType, UserAction } from "../utils";
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};
export default class PointPresenter {
  #handleDataChange = null
  #handleModeChange = null
  point = null
  pointComponent = null
  editComponent = null
  constructor(destination, destinations, offer, container, handleDataChange, handleModeChange) {
    this.destination = destination;
    this.destinations = destinations;
    this.offer = offer;
    console.log(this.offer)
    this.container = container;
    this.#handleDataChange = handleDataChange;
    this.#handleModeChange = handleModeChange;
    this.mode = Mode.DEFAULT
  }
  init(point) {
    this.point = point
    this.#renderPoint()
  }


  #renderPoint() {
    console.log(this.point)
    const prevPointComponent = this.pointComponent;
    const prevPointEditComponent = this.editComponent;
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    this.pointComponent = new RoutePointView(
      this.point,
      this.destinations.find(destination=>destination.id==this.point.destinationId),
      this.offer,
      () => {
        this.replaceCardToForm()
        document.addEventListener('keydown', escKeyDownHandler)
      },
      () => this.#handleFavoriteClick()

    )
    this.editComponent = new EditPointView(
      this.point,
      this.destination,
      this.destinations,
      this.offer,
      this.#handleFormSubmit,
     this.#handleFormClose,
     this.#handleDelete
    )
    //console.log(point)

   if (prevPointComponent === null || prevPointEditComponent === null) {
      render(
        this.pointComponent,
        this.container.element
      );
      return
   }
    if (this.mode === Mode.DEFAULT) {
      replace(this.pointComponent, prevPointComponent);
    }

    if (this.mode === Mode.EDITING) {
      replace(this.editComponent, prevPointEditComponent);
    }


  }
  replaceCardToForm() {
    this.#handleModeChange()
    this.mode = Mode.EDITING
    replace(this.editComponent, this.pointComponent)
  }
  replaceFormToCard() {
    this.mode = Mode.DEFAULT
    replace(this.pointComponent, this.editComponent)
  }
  resetView() {
    if (this.mode !== Mode.DEFAULT) {
      this.replaceFormToCard();
  }
}
destroy() {
  remove(this.pointComponent);
  remove(this.editComponent);
}
  #handleFavoriteClick = () => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, { ...this.point, isFavorite: !this.point.isFavorite });
  }
  #handleFormSubmit = (point) =>
  {
    console.log('Измененные данные')
    console.log(point)
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, point)
    this.replaceFormToCard()
  }
  #handleFormClose = (evt) =>
  {
    //evt.preventDefault()
    this.replaceFormToCard()
  }
  #handleDelete = (point) =>
    {
      console.log('Измененные данные')
      console.log(point)
      this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point)
      this.replaceFormToCard()
    }
}
