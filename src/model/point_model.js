import { POINTS_COUNT } from "../mocks/consts"
import { generatePoint } from "../mocks/point"
import Observable from "../framework/observable"

export class PointModel extends Observable {
  #points = null
  constructor(destinations, offers) {
    super()
    this.#points = Array.from({length: POINTS_COUNT}, ()=> generatePoint(destinations, offers))
  }
  get points()
  {
    return this.#points
    }
    getPoint(id) {
      return this.#points.find((point) => point.id === id);
    }

    setPoints(points) {
      this.#points = points;
    }

    setPoint(point, id) {
      this.#points = [...this.#points.filter((other) => other.id !== id), point];
    }

    addPoint(updateType, update) {
      this.#points = [
        update,
        ...this.#points,
      ];
      this._notify(updateType, update);
    }

    updatePoint(updateType, update) {
      const index = this.#points.findIndex((point) => point.id === update.id);

      if (index === -1) {
        throw new Error('The point doesn\'t exist!');
      }

      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    }

    deletePoint(updateType, update) {
      const index = this.#points.findIndex((point) => point.id === update.id);

      if (index === -1) {
        throw new Error('The point doesn\'t exist!');
      }

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(UPDATE_TYPE.MINOR, update);
    }
  }
