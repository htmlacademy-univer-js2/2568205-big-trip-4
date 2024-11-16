import { getRandomNumber, getRandomValue } from '../utils.js';
import { DESCRIPTIONS } from './consts.js';
import { TYPES } from './consts.js';
export function generateOffer()
{
  return {
    id: crypto.randomUUID(),
    title: getRandomValue(DESCRIPTIONS),
    price: getRandomNumber(1000, 5000),
    type: getRandomValue(TYPES)
  }
}
