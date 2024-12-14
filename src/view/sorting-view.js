import AbstractView from "../framework/view/abstract-view";
import { createElement } from "../render"

function createSortElement(sorts) {
  const sortItems =  sorts
  .map((sorting, index) => createSortingItemTemplate(sorting, index === 0))
  .join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
          </form>`
  );
}
function createSortingItemTemplate(sort, isChecked)
{
  const {type, isDisabled} = sort
return (` <div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"  ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`)
}
export default class SortView extends AbstractView {
  #sortItems
  constructor(sorts) {
    super()
    console.log(sorts)
    this.#sortItems = sorts
  }
  get template() {
    return createSortElement(this.#sortItems)
  }

}
