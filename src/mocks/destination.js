import { getRandomNumber, getRandomValue } from '../utils.js';
import { CITIES, DESCRIPTIONS } from './consts.js';
export function generateDestination()
{
  return {
    id: crypto.randomUUID(),
    name: getRandomValue(CITIES),
    description: getRandomValue(DESCRIPTIONS),
    pictures: Array.from({length: getRandomNumber(1, 5)}, () => ({
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: getRandomValue(DESCRIPTIONS)}))
  }
}
