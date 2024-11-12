import { DESTINATIONS_COUNT } from "../mocks/consts"
import { generateDestination } from "../mocks/destination"

export class DestinationModel {
  constructor() {
    this.destinations = Array.from({length: DESTINATIONS_COUNT}, generateDestination)
  }
getDestination() {
  return this.destinations
}
  getById(id)
  {
    return this.destinations.find(destination=>destination.id==id)
  }
  }
