import { OFFERS_COUNT } from "../mocks/consts"
import { generateOffer } from "../mocks/offer"

export class OfferModel {
constructor() {
  this.offers = Array.from({length: OFFERS_COUNT}, generateOffer)
}
getOffers() {
return this.offers
}
getOfferByType(type)
{
  return this.offers.filter(offer=>offer.type==type)

}
}
