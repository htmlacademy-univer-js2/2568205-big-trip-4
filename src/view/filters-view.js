import AbstractView from "../framework/view/abstract-view";

const { createElement } = require("../render");

function createFilterElement(filters) {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return (
    `<div class="trip-controls__filters">
              <h2 class="visually-hidden">Filter events</h2>
              <form class="trip-filters" action="#" method="get">
               ${filterItemsTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>
            </div>`
  )
}
function createFilterItemTemplate(filter, isChecked)
{
  const {type} = filter
  return (` <div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked? 'checked':''}>
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>`)
}
  export default class FilterView extends AbstractView {
   #filters
   #handleFilterTypeChange = null
    constructor(filters, currentFilterType, onFilterTypeChange) {
      super()
      this.#filters = filters
      this.#handleFilterTypeChange = onFilterTypeChange
      this.element.addEventListener('change', this.#filterTypeChangeHandler)

    }
    get template() {
      return createFilterElement(this.#filters)
    }

    #filterTypeChangeHandler = (evt) => {
      evt.preventDefault();
      console.log(this.#handleFilterTypeChange)
      this.#handleFilterTypeChange(evt.target.value);
    };

  }
