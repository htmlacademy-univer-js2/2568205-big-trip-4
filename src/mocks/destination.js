import { getRandomNumber, getRandomValue } from '../utils.js';
import { CITIES, DESCRIPTIONS, DESTINATIONS_COUNT, CITIES_COUNT } from './consts.js';
export function generateDestinations()
{
  let destinations = []
  for (let i=0; i<DESTINATIONS_COUNT; i++)
  destinations.push({
    id: crypto.randomUUID(),
    name: CITIES[i%CITIES_COUNT],
    description: getRandomValue(DESCRIPTIONS),
    pictures: Array.from({length: getRandomNumber(1, 5)}, () => ({
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: getRandomValue(DESCRIPTIONS)}))
  })
  return destinations
}
