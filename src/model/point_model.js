import { POINTS_COUNT } from "../mocks/consts"
import { generatePoint } from "../mocks/point"

export class PointModel {
  #points = null
  constructor(destinations, offers) {
    this.#points = Array.from({length: POINTS_COUNT}, ()=> generatePoint(destinations, offers))
  }
  get points()
  {
    return this.#points
    }
  }
