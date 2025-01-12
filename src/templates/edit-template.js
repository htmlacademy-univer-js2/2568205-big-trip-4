import { CITIES, TYPES } from "../mocks/consts";
export function createEditTemplate(point, destination, offers) {
  console.log(point)
  console.log(destination)
  console.log(destination==undefined)
  console.log(destination.pictures)
  const { type} = point;
  console.log('Данные формы')

  //console.log(destination)
  console.log(offers)


  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createPointTypesListElement(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination==undefined? '': destination.name}" list="destination-list-1">
                    ${createDestinationListTemplate()}
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${createPointOffer(offers, type)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">${destination==undefined?'':destination.name}</h3>
                    <p class="event__destination-description">${destination==undefined?'':destination.description}</p>
                    ${destination==undefined?'': createPictures(destination.pictures)}
                  </section>
                </section>
              </form>
            </li>`

  )
}
function createPictures(pictures) {
  console.log(pictures)
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>`;
}
function createPointTypesListElement(currentType) {
  return TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`).join('');
}
function createDestinationListTemplate()
{
  return `<datalist id="destination-list-1">
                     ${CITIES.map((city)=>`<option value="${city}">`).join('')}
                    </datalist>`
}
function createPointOffer(offers, type)
{
  console.log(offers)

  let result=''
  offers.map(offer=>offer['offers'].forEach((offer, index) => {
    let price = offer.price
    let title = offer.title
    console.log(price)
    console.log(title)
    result+=`<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index+1}" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-${type}-${index+1}">
                          <span class="event__offer-title">${title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>`
  }));
  return result
}
