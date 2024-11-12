import { getRandomNumber, getRandomValue, getRandomDate, getRandomDateAfter } from '../utils.js';
import { TYPES } from './consts.js';
export function generatePoint(destinations, offers)
{
  let dateFrom = getRandomDate()
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomNumber(1000, 7000),
    dateFrom,
    dateTo: getRandomDateAfter(dateFrom),
    destinationId: getRandomValue(destinations).id,
    isFavorite: getRandomValue([true, false]),
    offerIds: offers.map(offer=>offer.id),
    type: getRandomValue(TYPES)
  }
}
