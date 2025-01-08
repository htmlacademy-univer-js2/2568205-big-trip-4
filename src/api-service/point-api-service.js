import ApiService from '../framework/api-service';
import { Method } from './const';
export default class PointApiService extends ApiService {
get points() {
 return this._load({url: 'points', method: Method.GET}).then(ApiService.parseResponse)
}
async updatePoint(point) {
  const response = await this._load({
    url: `points/${point.id}`,
    method: Method.PUT,
    body: JSON.stringify(this.#adoptToServer(point)),
    headers: new Headers({'Content-Type': 'application/json'}),
  });

  const parsedResponse = await ApiService.parseResponse(response);

  return parsedResponse;
}
async addPoint(point) {
  const response = await this._load({
    url: `points`,
    method: Method.POST,
    body: JSON.stringify(this.#adoptToServer(point)),
    headers: new Headers({'Content-Type': 'application/json'}),
  });


  const parsedResponse = await ApiService.parseResponse(response);
  console.log(parsedResponse)
  return parsedResponse;
}
async deletePoint(point) {
  const response = await this._load({
    url: `points/${point.id}`,
    method: Method.POST,
    body: JSON.stringify(this.#adoptToServer(point)),
    headers: new Headers({'Content-Type': 'application/json'}),
  });


  const parsedResponse = await ApiService.parseResponse(response);

  return parsedResponse;
}

#adoptToServer(point) {
  const adaptedPoint = {
    ...point,
    base_price: point['basePrice'],
      date_from: point['dateFrom'],
      date_to: point['dateTo'],
      is_favorite: point['isFavorite'],
      offers: point['offerIds']
  }
  delete adaptedPoint['basePrice'];
  delete adaptedPoint['dateFrom'];
  delete adaptedPoint['dateTo'];
  delete adaptedPoint['isFavorite'];
  delete adaptedPoint['offerIds']

  return adaptedPoint
}
}
