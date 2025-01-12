import Observable from "../framework/observable"
import { DESTINATIONS_COUNT } from "../mocks/consts"
import { generateDestinations } from "../mocks/destination"
import { UpdateType } from "../utils"

export class DestinationModel extends Observable {
  destinations = []
  constructor(destinationService) {
    super()
    this.destinationService = destinationService
  }
 async  init() {
    try {
      console.log("Города")
      console.log(this.destinationService)
      this.destinations = await this.destinationService.destinations;
     this._notify(UpdateType.INIT);
    } catch(err) {
      this.destinations = [];
    }
  }
get all() {
  return this.destinations
}
  getById(id)
  {
    return this.destinations.find(destination=>destination.id==id)
  }
  }
