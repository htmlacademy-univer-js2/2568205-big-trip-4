import RoutePointView from "../view/route-point-view";
import EditPointView from "../view/editing-view";
import { render, replace } from "../framework/render";
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
  constructor(destination, offer, container, handleDataChange, handleModeChange) {
    this.destination = destination;
    this.offer = offer;
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
      this.destination,
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
      this.offer,
      this.#handleFormSubmit
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
  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.point, isFavorite: !this.point.isFavorite });
  }
  #handleFormSubmit = (point) =>
  {
    console.log('Измененные данные')
    console.log(point)
    this.#handleDataChange(point)
    this.replaceFormToCard()
  }

}
