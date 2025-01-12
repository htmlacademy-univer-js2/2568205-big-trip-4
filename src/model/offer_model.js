import Observable from "../framework/observable";
import { OFFERS_COUNT } from "../mocks/consts"
import { generateOffer } from "../mocks/offer"
import { UpdateType } from "../utils";

export class OfferModel extends Observable {

  constructor(offersApiService) {
    super();
    this.offersApiService = offersApiService;
  }
 async init() {
    try {
      const offers =   await this.offersApiService.offers;
      this.offers = offers
     // this._notify(UpdateType.INIT)
    } catch(err) {
      this.offers = [];
    }
  }
getOffers() {
  console.log(this.offers)
return this.offers
}
getOfferByType(type)
{
  return this.offers.filter(offer=>offer.type==type)

}
async #adoptToClient(offers)
{
  const results = await offers.map(currentElement=>getValidOffers(currentElement['offers'], currentElement['type']))
  console.log(results)
  return results
}

}
async function getValidOffers (offers, type) {
  console.log(offers)
  return offers.map(element=>element['type']=type)
}
