import { POINTS_COUNT } from "../mocks/consts"
import { generatePoint } from "../mocks/point"
import Observable from "../framework/observable"
import { UpdateType } from "../utils"

export class PointModel extends Observable {
  #points = []

  constructor(pointService) {
    super()
    this.pointService = pointService
  }
  async init() {
    try {
      const points = await this.pointService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
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

   async updatePoint(updateType, update) {
      const index = this.#points.findIndex((point) => point.id === update.id);

      if (index === -1) {
        throw new Error('The point doesn\'t exist!');
      }


      try {
        const response = await this.pointService.updatePoint(update);
        const updatedPoint = await this.#adaptToClient(response);
        this.#points = [
          ...this.#points.slice(0, index),
          updatedPoint,
          ...this.#points.slice(index + 1),
        ];
        this._notify(updateType, updatedPoint);
      } catch(err) {
        console.log(err)
        console.log(response)
        throw new Error('Can\'t update point');
      }

      this._notify(updateType, update);
    }

    deletePoint(updateType, update) {
      const index = this.#points.findIndex((point) => point.id === update.id);
      console.log(this.#points)
      console.log(update.id)
      if (index === -1) {
        throw new Error('The point doesn\'t exist!');
      }

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(UpdateType.MINOR, update);
    }
    #adaptToClient = (point) => {
      const adaptedPoint = {...point,
        basePrice: point['base_price'],
        dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
        dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
        isFavorite: point['is_favorite'],
        destinationId: point['destination'],
        offerIds: point['offers']
      };

      // Ненужные ключи мы удаляем
      delete adaptedPoint['base_price'];
      delete adaptedPoint['date_from'];
      delete adaptedPoint['date_to'];
      delete adaptedPoint['is_favorite'];
      delete adaptedPoint['destination']
      delete adaptedPoint['offers']
      return adaptedPoint;
    };
  }
