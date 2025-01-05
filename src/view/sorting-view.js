import AbstractView from "../framework/view/abstract-view";
import { createElement } from "../render"

function createSortElement(sorts, currentSortType) {
  console.log(sorts)
  const sortItems =  sorts
  .map((sorting) => createSortingItemTemplate(sorting, currentSortType===sorting.type))
  .join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
          </form>`
  );
}
function createSortingItemTemplate(sort, isChecked)
{
  const {type,  isDisabled} = sort
return (` <div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${type}" value="sort-${type}"  ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`)
}
export default class SortView extends AbstractView {
  #sortItems
  #currentSortType
  #handleSortTypeChange = null;
  constructor(sorts, currentSortType, onSortTypeChange) {
    super()
    console.log(sorts)
    this.#sortItems = sorts
    this.#currentSortType = currentSortType
    this.#handleSortTypeChange = onSortTypeChange
    this.element.addEventListener('click', this.#sortTypeChangeHandler)
  }
  get template() {
    return createSortElement(this.#sortItems, this.#currentSortType)
  }
  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    console.log(evt.target.dataset)
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
