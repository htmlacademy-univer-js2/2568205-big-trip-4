import { DESTINATIONS_COUNT } from "../mocks/consts"
import { generateDestinations } from "../mocks/destination"

export class DestinationModel {
  constructor() {
    this.destinations = generateDestinations()
  }
get all() {
  return this.destinations
}
  getById(id)
  {
    return this.destinations.find(destination=>destination.id==id)
  }
  }
