import ApiService from '../framework/api-service.js'
import { Method } from './const.js';
export default class DestinationsApiService extends ApiService {
  get destinations() {
    console.log("Тест")
    return this._load({url: 'destinations', method: Method.GET})
      .then(ApiService.parseResponse);
  }
}

