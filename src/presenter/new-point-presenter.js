import { remove, RenderPosition, render } from "../framework/render";
import EditPointView from "../view/editing-view";
import { DEFAULT_TYPE, EMPTY_POINT, UpdateType, UserAction } from "../utils";

export default class NewPointPresenter {
  #pointListContainer;
  #destinationsModel;
  #offersModel
  #handleDataChange
  #handleDestroy;

  editComponent

  constructor(pointListContainer, destinationsModel, offerModel, changeDataHandler, destroyHandler) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offerModel;
    this.#handleDataChange = changeDataHandler;
    this.#handleDestroy = destroyHandler;
  }

  init() {
    if (!(this.editComponent==null)) {
      console.log(this.editComponent)
      return;
    }

   this.editComponent = new EditPointView(
    EMPTY_POINT,
         null,
         this.#destinationsModel.all,
         this.#offersModel.getOfferByType(DEFAULT_TYPE),
         this.#handleFrormSubmit,
        this.#handleFormClose
       )
       console.log(this.#pointListContainer)

    render(this.editComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    console.log(this.editComponent)
    if (this.editComponent == null) {
      return;
    }
    console.log(this.#handleDestroy)
    this.#handleDestroy();

    remove(this.editComponent);
    this.editComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFrormSubmit = (point) => {
    console.log(this.#handleDataChange)
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: crypto.randomUUID(), ...point },
    );
    this.destroy();
  };

  #handleResetClick = () => {
    this.destroy();
  };
  #handleFormClose = () => {
    this.destroy()
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key=='Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
