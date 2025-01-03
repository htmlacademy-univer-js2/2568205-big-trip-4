import { sorts } from "../utils";
import {SORTING_TYPES} from "../utils"
export function getMockSorts() {
  return Object.entries(sorts).map(([type, points]) => ({
    type,
    points,
    isDisabled: type === SORTING_TYPES.EVENT || type === SORTING_TYPES.OFFERS
  }));
}
